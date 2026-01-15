export default function ActionSheet({ open, onSelect, onClose }) {
  if (!open) return null

  const actions = [
    { key: "movimiento", label: "Crear movimiento" },
    { key: "transferencia", label: "Crear transferencia" },
    { key: "cuenta", label: "Crear cuenta" },
    { key: "categoria", label: "Crear categoría" }
  ]

  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex items-end">
      <div className="bg-slate-900 w-full rounded-t-xl border-t border-slate-800 p-4 space-y-2">
        {actions.map(a => (
          <button
            key={a.key}
            onClick={() => onSelect(a.key)}
            className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-left px-4"
          >
            {a.label}
          </button>
        ))}
        <button
          onClick={onClose}
          className="w-full py-3 text-slate-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
