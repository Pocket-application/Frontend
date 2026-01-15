import Modal from "../ui/Modal"

export default function MonthPickerModal({
  open,
  onClose,
  month,
  year,
  setMonth,
  setYear
}) {
  return (
    <Modal open={open} onClose={onClose} title="Seleccionar mes">
      <div className="flex gap-3">
        <select
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          className="input"
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
          className="input"
        />
      </div>
    </Modal>
  )
}
