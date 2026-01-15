import { Calendar, Search } from "lucide-react"

export default function DashboardHeader({
  greeting,
  onOpenMonth,
  onOpenAdvanced
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">{greeting}</h1>
        <p className="text-slate-400 mt-1">
          Bienvenido a tu panel financiero
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMonth}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:bg-slate-800 transition"
        >
          <Calendar size={18} />
          <span>Este mes</span>
        </button>

        <button
          onClick={onOpenAdvanced}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition"
        >
          <Search size={16} />
          <span className="text-sm">Búsqueda avanzada</span>
        </button>
      </div>
    </div>
  )
}
