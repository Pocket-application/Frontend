export default function CategoriasHeader({ onCreate }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-3xl font-bold">Categorías</h1>

      <button onClick={onCreate} className="btn-primary">
        Nueva categoría
      </button>
    </div>
  )
}
