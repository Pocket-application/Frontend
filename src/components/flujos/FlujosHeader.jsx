import { Calendar, Search } from "lucide-react"
import { useEffect, useMemo } from "react"

export default function FlujosHeader({
  categorias = [],
  categoriaId,
  setCategoriaId,
  tipo,
  setTipo,
  onMonth,
  onAdvanced
}) {

  /* =========================
     CATEGORÍAS SEGÚN EL TIPO
  ========================= */
  const categoriasFiltradas = useMemo(() => {
    if (!tipo) return []
    return categorias.filter(c => c.tipo_movimiento === tipo)
  }, [categorias, tipo])

  /* =========================
     RESET CATEGORÍA AL CAMBIAR TIPO
  ========================= */
  useEffect(() => {
    setCategoriaId("")
  }, [tipo, setCategoriaId])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Movimientos</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={onMonth}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:bg-slate-800 transition"
          >
            <Calendar size={18} />
            Mes
          </button>

          <button
            onClick={onAdvanced}
            className="text-sm text-slate-400 px-4 py-2 hover:text-slate-200 transition flex items-center gap-2"
          >
            <Search size={16} />
            Búsqueda avanzada
          </button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {/* =========================
            FILTRO POR TIPO
        ========================= */}
        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          className="input max-w-xs"
        >
          <option value="">Ingreso o Egreso</option>
          <option value="Ingreso">Ingresos</option>
          <option value="Egreso">Egresos</option>
        </select>

        {/* =========================
            FILTRO POR CATEGORÍA
        ========================= */}
        <select
          value={categoriaId}
          onChange={e => setCategoriaId(e.target.value)}
          disabled={!tipo}
          className={`input max-w-xs ${!tipo ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <option value="">
            {tipo ? "Todas las categorías" : "Seleccione un tipo primero"}
          </option>

          {categoriasFiltradas.map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
