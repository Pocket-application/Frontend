export default function Pagination({
  total,
  page,
  pageSize,
  setPage,
  setPageSize
}) {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-sm text-slate-400">
        Total registros: {total}
      </span>

      <div className="flex items-center gap-3">
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
            setPage(1)
          }}
          className="input w-24"
        >
          {[5, 10, 20, 50].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="btn-secondary disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="text-sm">
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(p => p + 1)}
          className="btn-secondary disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
