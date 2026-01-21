/* =========================
   HELPERS
========================= */
const formatCurrency = value =>
  `$${Number(value).toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`

export default function ResumenGeneral({ flujos, categorias }) {
  /* =========================
     CATEGORÍAS VÁLIDAS
     (excluye transferencias)
  ========================= */
  const categoriasValidas = categorias.filter(
    c => c.nombre !== "Transferencias entre cuentas"
  )

  const categoriasValidasIds = categoriasValidas.map(c => c.id)

  /* =========================
     FLUJOS VÁLIDOS
  ========================= */
  const flujosValidos = flujos.filter(
    f => categoriasValidasIds.includes(f.categoria_id)
  )

  const ingresos = flujosValidos.filter(
    f => f.tipo_movimiento === "Ingreso"
  )

  const egresos = flujosValidos.filter(
    f => f.tipo_movimiento === "Egreso"
  )

  const totalIngresos = ingresos.reduce(
    (acc, f) => acc + Number(f.monto),
    0
  )

  const totalEgresos = egresos.reduce(
    (acc, f) => acc + Number(f.monto),
    0
  )

  const balance = totalIngresos - totalEgresos

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* INGRESOS */}
      <div>
        <p className="text-sm text-slate-400">Ingresos</p>
        <p className="text-2xl font-semibold text-emerald-400">
          {formatCurrency(totalIngresos)}
        </p>
      </div>

      {/* EGRESOS */}
      <div>
        <p className="text-sm text-slate-400">Egresos</p>
        <p className="text-2xl font-semibold text-red-400">
          {formatCurrency(totalEgresos)}
        </p>
      </div>

      {/* BALANCE */}
      <div>
        <p className="text-sm text-slate-400">Balance</p>
        <p
          className={`text-2xl font-semibold ${
            balance >= 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {formatCurrency(balance)}
        </p>
      </div>

      {/* MOVIMIENTOS */}
      <div>
        <p className="text-sm text-slate-400">Movimientos</p>
        <p className="text-2xl font-semibold">
          {flujos.length}
        </p>
      </div>
    </div>
  )
}
