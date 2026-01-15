export default function DeleteCuentaModal({
  cuenta,
  onClose,
  onConfirm
}) {
  if (!cuenta) return null

  const tieneSaldo = cuenta.saldo !== 0

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl p-6 w-96 space-y-4">
        <h2 className="text-xl font-semibold">Eliminar cuenta</h2>

        {tieneSaldo ? (
          <p className="text-red-400 text-sm">
            No puedes eliminar esta cuenta porque tiene saldo.
          </p>
        ) : (
          <p className="text-slate-400">
            Esta acción no se puede deshacer.
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>

          {!tieneSaldo && (
            <button onClick={onConfirm} className="btn-danger">
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
