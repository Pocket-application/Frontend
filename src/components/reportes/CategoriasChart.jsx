import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"

/* =========================
   FORMATOS
========================= */
const formatCurrency = value =>
  `$${Number(value).toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`

/* =========================
   PALETAS (15 COLORES)
========================= */
const COLORS_INGRESOS = [
  "#064E3B", "#065F46", "#047857", "#059669", "#10B981",
  "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5", "#ECFDF5",
  "#166534", "#15803D", "#16A34A", "#22C55E", "#4ADE80"
]

const COLORS_EGRESOS = [
  "#7F1D1D", "#991B1B", "#B91C1C", "#DC2626", "#EF4444",
  "#F87171", "#FCA5A5", "#FECACA", "#FEE2E2", "#FEF2F2",
  "#881337", "#9F1239", "#BE123C", "#E11D48", "#FB7185"
]

export default function CategoriasChart({ flujos, categorias }) {
  const categoriasValidas = categorias.filter(
    c => c.nombre !== "Transferencias entre cuentas"
  )

  const ingresosData = categoriasValidas
    .map(c => ({
      name: c.nombre,
      value: flujos
        .filter(
          f =>
            f.categoria_id === c.id &&
            f.tipo_movimiento === "Ingreso"
        )
        .reduce((acc, f) => acc + Number(f.monto), 0)
    }))
    .filter(c => c.value > 0)

  const egresosData = categoriasValidas
    .map(c => ({
      name: c.nombre,
      value: flujos
        .filter(
          f =>
            f.categoria_id === c.id &&
            f.tipo_movimiento === "Egreso"
        )
        .reduce((acc, f) => acc + Number(f.monto), 0)
    }))
    .filter(c => c.value > 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* INGRESOS */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Ingresos por categoría
        </h2>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={ingresosData}
              dataKey="value"
              outerRadius={100}
              label={({ name, value }) =>
                `${name}: ${formatCurrency(value)}`
              }
            >
              {ingresosData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS_INGRESOS[index % COLORS_INGRESOS.length]}
                />
              ))}
            </Pie>

            <Tooltip formatter={formatCurrency} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* EGRESOS */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Egresos por categoría
        </h2>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={egresosData}
              dataKey="value"
              outerRadius={100}
              label={({ name, value }) =>
                `${name}: ${formatCurrency(value)}`
              }
            >
              {egresosData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS_EGRESOS[index % COLORS_EGRESOS.length]}
                />
              ))}
            </Pie>

            <Tooltip formatter={formatCurrency} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
