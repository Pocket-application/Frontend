import Modal from './Modal'

export default function MonthPickerModal({
  open,
  onClose,
  onConfirm,
  month,
  year,
  setMonth,
  setYear
}) {
  return (
    <Modal open={open} onClose={onClose} title="Seleccionar período">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-slate-400">Mes</label>
          <select
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
            className="w-full mt-1 bg-slate-800 rounded-xl p-2"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('es', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-400">Año</label>
          <input
            type="number"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
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
            Aplicar
          </button>
        </div>
      </div>
    </Modal>
  )
}
