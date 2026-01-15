export default function ResumenGeneral({ flujos, cuentas }) {
  const ingresos = flujos.filter(f => f.tipo_movimiento === "Ingreso")
  const egresos = flujos.filter(f => f.tipo_movimiento === "Egreso")
  const transferencias = flujos.filter(f => f.categoria_id === null)

  const totalIngresos = ingresos.reduce((acc, f) => acc + Number(f.monto), 0)
  const totalEgresos = egresos.reduce((acc, f) => acc + Number(f.monto), 0)
  const balance = totalIngresos - totalEgresos

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <p className="text-sm text-slate-400">Ingresos</p>
        <p className="text-2xl font-semibold text-emerald-400">
          ${totalIngresos.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-slate-400">Egresos</p>
        <p className="text-2xl font-semibold text-red-400">
          ${totalEgresos.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-slate-400">Balance</p>
        <p className={`text-2xl font-semibold ${balance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          ${balance.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-slate-400">Movimientos</p>
        <p className="text-2xl font-semibold">
          {flujos.length}
        </p>
      </div>
    </div>
  )
}
