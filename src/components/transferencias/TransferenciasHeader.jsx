import { Calendar, Search } from "lucide-react"

export default function TransferenciasHeader({ onMonth, onAdvanced }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Transferencias</h1>

        <div className="flex items-center gap-3">
          <button onClick={onMonth} className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:bg-slate-800 transition">
            <Calendar size={18} />
            Mes
          </button>
          <button
            onClick={onAdvanced}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition"
          >
            <Search size={16} />
            Búsqueda avanzada
          </button>
        </div>
      </div>
    </div>
  )
}
