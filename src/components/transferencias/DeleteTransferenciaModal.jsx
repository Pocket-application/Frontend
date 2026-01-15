export default function DeleteTransferenciaModal({
  id,
  onClose,
  onConfirm
}) {
  if (!id) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl p-6 w-80 space-y-4">
        <h2 className="text-xl font-semibold">Eliminar transferencia</h2>

        <p className="text-slate-400">
          ¿Seguro que deseas eliminar esta transferencia?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn-danger">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
