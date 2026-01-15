import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useMemo } from "react"

export default function EvolucionChart({ flujos }) {
  const data = useMemo(() => {
    if (!flujos.length) return []

    // Ordenar por fecha
    const sorted = [...flujos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha))

    // Agrupar por día
    const grouped = {}
    sorted.forEach(f => {
      const fecha = new Date(f.fecha).toLocaleDateString("es-CO")
      if (!grouped[fecha]) grouped[fecha] = 0
      grouped[fecha] += f.tipo_movimiento === "Ingreso" ? Number(f.monto) : -Number(f.monto)
    })

    // Crear array de fechas consecutivas desde el primer hasta el último día
    const startDate = new Date(sorted[0].fecha)
    const endDate = new Date(sorted[sorted.length - 1].fecha)
    const result = []
    let acumulado = 0

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const key = d.toLocaleDateString("es-CO")
      if (grouped[key]) acumulado += grouped[key]
      result.push({ fecha: key, saldo: acumulado })
    }

    return result
  }, [flujos])

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Evolución del saldo (diaria)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="fecha" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" />
          <Tooltip formatter={value => `$${value.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          <Line type="monotone" dataKey="saldo" stroke="#10B981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
