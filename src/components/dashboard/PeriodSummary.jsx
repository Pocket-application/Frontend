function Card({ title, value, color }) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <p className="text-slate-400">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>
        ${value.toLocaleString()}
      </p>
    </div>
  )
}

export default function PeriodSummary({ ingresos, egresos }) {
  const balance = ingresos - egresos

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card title="Ingresos" value={ingresos} color="text-emerald-400" />
      <Card title="Egresos" value={egresos} color="text-red-400" />
      <Card
        title="Balance"
        value={balance}
        color={balance >= 0 ? "text-emerald-400" : "text-red-400"}
      />
    </div>
  )
}
