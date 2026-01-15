import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function CategoriasChart({ flujos, categorias }) {
  const ingresosData = categorias.map(c => ({
    name: c.nombre,
    value: flujos
      .filter(f => f.categoria_id === c.id && f.tipo_movimiento === "Ingreso")
      .reduce((acc, f) => acc + Number(f.monto), 0)
  })).filter(c => c.value > 0)

  const egresosData = categorias.map(c => ({
    name: c.nombre,
    value: flujos
      .filter(f => f.categoria_id === c.id && f.tipo_movimiento === "Egreso")
      .reduce((acc, f) => acc + Number(f.monto), 0)
  })).filter(c => c.value > 0)

  const COLORS_IN = ["#10B981", "#22c55e", "#34d399", "#6ee7b7", "#a7f3d0"]
  const COLORS_OUT = ["#ef4444", "#f87171", "#fca5a5", "#fda4af", "#fecaca"]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Ingresos por categoría</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={ingresosData} dataKey="value" outerRadius={90} label>
              {ingresosData.map((entry, index) => (
                <Cell key={index} fill={COLORS_IN[index % COLORS_IN.length]} />
              ))}
            </Pie>
            <Tooltip formatter={value => `$${value.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Egresos por categoría</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={egresosData} dataKey="value" outerRadius={90} label>
              {egresosData.map((entry, index) => (
                <Cell key={index} fill={COLORS_OUT[index % COLORS_OUT.length]} />
              ))}
            </Pie>
            <Tooltip formatter={value => `$${value.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
