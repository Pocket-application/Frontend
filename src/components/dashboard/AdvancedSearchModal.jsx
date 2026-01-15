import Modal from './Modal'

export default function AdvancedSearchModal({
  open,
  onClose,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onConfirm
}) {
  return (
    <Modal open={open} onClose={onClose} title="Búsqueda avanzada">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-slate-400">Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full mt-1 bg-slate-800 rounded-xl p-2"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Hasta</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full mt-1 bg-slate-800 rounded-xl p-2"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-slate-400">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-emerald-600 rounded-xl font-semibold"
          >
            Buscar
          </button>
        </div>
      </div>
    </Modal>
  )
}
