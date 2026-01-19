import Modal from "../ui/Modal"

export default function DeleteFlujoModal({ id, onClose, onConfirm }) {
  return (
    <Modal open={id !== null} onClose={onClose} title="Eliminar movimiento">
      <p className="text-slate-400">
        ¿Estás seguro de que deseas eliminar este movimiento?
        Esta acción no se puede deshacer.
      </p>

      <div className="flex gap-3 mt-4">
        <button onClick={onClose} className="btn-secondary w-full">
          Cancelar
        </button>
        <button onClick={onConfirm} className="btn-danger w-full">
          Eliminar
        </button>
      </div>
    </Modal>
  )
}
