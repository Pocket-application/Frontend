export default function MonthPickerModal({
  open,
  onClose,
  month,
  year,
  setMonth,
  setYear
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl p-6 w-80 space-y-4">
        <h2 className="text-xl font-semibold">Seleccionar mes</h2>

        <select
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          className="input w-full"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("es", { month: "long" })}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
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
