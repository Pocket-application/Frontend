export default function FiltersModal({
  open,
  onClose,
  startDate, endDate, setStartDate, setEndDate,
  tipo, setTipo,
  categorias, categoriaId, setCategoriaId,
  cuentas, cuentaId, setCuentaId
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form className="bg-slate-900 rounded-2xl p-6 w-96 space-y-4" onSubmit={e => e.preventDefault()}>
        <h2 className="text-xl font-semibold">Filtros</h2>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Fecha inicio</label>
          <input type="date" className="input w-full" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Fecha fin</label>
          <input type="date" className="input w-full" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Tipo de movimiento</label>
          <select className="input w-full" value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Categoría</label>
          <select className="input w-full" value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
            <option value="">Todas</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Cuenta</label>
          <select className="input w-full" value={cuentaId} onChange={e => setCuentaId(e.target.value)}>
            <option value="">Todas</option>
            {cuentas.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={onClose} className="btn-secondary">Cerrar</button>
        </div>
      </form>
    </div>
  )
}
