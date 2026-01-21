import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { useMemo } from "react"

const formatCurrency = value =>
  `$${Number(value).toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`

export default function EvolucionChart({ flujos = [] }) {
  const data = useMemo(() => {
    if (!flujos.length) return []

    /* =========================
       ORDENAR POR FECHA
    ========================= */
    const sorted = [...flujos].sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    )

    const firstDate = new Date(sorted[0].fecha)
    const lastDate = new Date(sorted[sorted.length - 1].fecha)

    /* =========================
       DETECTAR MODO (MES / RANGO)
    ========================= */
    const sameMonth =
      firstDate.getFullYear() === lastDate.getFullYear() &&
      firstDate.getMonth() === lastDate.getMonth()

    const today = new Date()

    let startDate
    let endDate

    if (sameMonth) {
      // Inicio del mes
      startDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)

      const isCurrentMonth =
        firstDate.getFullYear() === today.getFullYear() &&
        firstDate.getMonth() === today.getMonth()

      if (isCurrentMonth) {
        // 👈 NO dibujar futuro
        endDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        )
      } else {
        // Mes pasado → fin real del mes
        endDate = new Date(
          firstDate.getFullYear(),
          firstDate.getMonth() + 1,
          0
        )
      }
    } else {
      // RANGO DE FECHAS
      startDate = new Date(firstDate)
      endDate = new Date(lastDate)
    }

    /* =========================
       AGRUPAR MOVIMIENTOS POR DÍA
    ========================= */
    const grouped = {}

    sorted.forEach(f => {
      const key = new Date(f.fecha).toLocaleDateString("es-CO")
      if (!grouped[key]) grouped[key] = 0

      grouped[key] +=
        f.tipo_movimiento === "Ingreso"
          ? Number(f.monto)
          : -Number(f.monto)
    })

    /* =========================
       CONSTRUIR EVOLUCIÓN DIARIA
    ========================= */
    const result = []
    let acumulado = 0

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const key = d.toLocaleDateString("es-CO")

      if (grouped[key]) {
        acumulado += grouped[key]
      }

      result.push({
        fecha: key,
        saldo: acumulado
      })
    }

    return result
  }, [flujos])

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Evolución del saldo
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="fecha"
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke="#94a3b8"
            tickFormatter={formatCurrency}
          />

          <Tooltip formatter={formatCurrency} />

          <Line
            type="monotone"
            dataKey="saldo"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
