export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-emerald-400">{title}</h2>

        {children}

        <button
          onClick={onClose}
          className="w-full mt-4 border border-slate-700 rounded-lg py-2 text-slate-300 hover:bg-slate-800"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
