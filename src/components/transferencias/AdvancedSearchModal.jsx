export default function AdvancedSearchModal({
  open,
  onClose,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl p-6 w-96 space-y-4">
        <h2 className="text-xl font-semibold">Búsqueda avanzada</h2>

        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="input w-full"
        />

        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="input w-full"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
