export default function PeriodTotals({ ingresos, egresos }) {
  const balance = ingresos - egresos
  const isPositive = balance >= 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
        <p className="text-sm text-slate-400">Ingresos</p>
        <p className="text-2xl font-bold text-emerald-400">
          ${ingresos.toLocaleString("es-CO")}
        </p>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
        <p className="text-sm text-slate-400">Egresos</p>
        <p className="text-2xl font-bold text-red-400">
          ${egresos.toLocaleString("es-CO")}
        </p>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
        <p className="text-sm text-slate-400">Balance</p>
        <p
          className={`text-2xl font-bold ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          ${balance.toLocaleString("es-CO")}
        </p>
      </div>
    </div>
  )
}
