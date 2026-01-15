import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"

// 🎨 Colores
const COLORS = {
  Ingresos: "#22c55e", // verde
  Egresos: "#ef4444"  // rojo suave
}

// 💰 Formateador de moneda
const formatCurrency = value =>
  `$${Number(value).toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`

// 🧾 Tooltip custom
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const { name, value } = payload[0]

  return (
    <div className="rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm shadow-lg">
      <p className="font-medium">{name}</p>
      <p className="text-emerald-400">{formatCurrency(value)}</p>
    </div>
  )
}

export default function IncomeExpensePie({ ingresos, egresos }) {
  const data = [
    { name: "Ingresos", value: ingresos },
    { name: "Egresos", value: egresos }
  ]

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      
      {/* 🧠 Título */}
      <h3 className="text-lg font-semibold mb-4">
        Ingresos vs Egresos
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            innerRadius={45}
            paddingAngle={4}
          >
            {data.map(entry => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
