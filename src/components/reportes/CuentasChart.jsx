import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function CuentasChart({ flujos, cuentas }) {
  const data = cuentas.map(c => {
    const ingresos = flujos
      .filter(f => f.cuenta_id === c.id && f.tipo_movimiento === "Ingreso")
      .reduce((acc, f) => acc + Number(f.monto), 0)
    const egresos = flujos
      .filter(f => f.cuenta_id === c.id && f.tipo_movimiento === "Egreso")
      .reduce((acc, f) => acc + Number(f.monto), 0)
    return { name: c.nombre, Ingreso: ingresos, Egreso: egresos }
  })

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Ingresos y egresos por cuenta</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip formatter={value => `$${value.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          <Legend />
          <Bar dataKey="Ingreso" fill="#10B981" />
          <Bar dataKey="Egreso" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
