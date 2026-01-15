import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts"

export default function IncomeExpensePie({ ingresos, egresos }) {
  const data = [
    { name: "Ingresos", value: ingresos },
    { name: "Egresos", value: egresos }
  ]

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={90} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
