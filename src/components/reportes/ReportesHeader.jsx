export default function ReportesHeader({ onFilters }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-3xl font-bold">Reportes</h1>
      <button onClick={onFilters} className="btn-secondary">
        Filtrar / Rango de fechas
      </button>
    </div>
  )
}
