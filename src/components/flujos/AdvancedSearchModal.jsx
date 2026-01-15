import Modal from "../ui/Modal"

export default function AdvancedSearchModal({
  open,
  onClose,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) {
  return (
    <Modal open={open} onClose={onClose} title="Búsqueda avanzada">
      <input
        type="date"
        className="input"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />

      <input
        type="date"
        className="input"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
    </Modal>
  )
}
