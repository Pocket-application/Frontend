export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-slate-900 rounded-xl w-full max-w-md border border-slate-800 shadow-xl">
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-800">
          <h3 className="font-semibold text-slate-100">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <div className="p-5 space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}
