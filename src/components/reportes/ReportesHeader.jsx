import { ChevronLeft, ChevronRight, Search } from "lucide-react"

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

export default function ReportesHeader({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onOpenMonth,
  onFilters
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Reportes</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={onPrevMonth}
            className="p-2 rounded-lg border border-slate-700 hover:bg-slate-800"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={onOpenMonth}
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 font-medium"
          >
            {MONTHS[month]} {year}
          </button>

          <button
            onClick={onNextMonth}
            className="p-2 rounded-lg border border-slate-700 hover:bg-slate-800"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={onFilters}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 px-3 py-2"
          >
            <Search size={16} /> Búsqueda avanzada
          </button>
        </div>
      </div>
    </div>
  )
}
