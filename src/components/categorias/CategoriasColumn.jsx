import { Pencil, Trash2 } from "lucide-react"

const COLORS = {
  emerald: {
    title: "text-emerald-400",
    button: "bg-emerald-600 hover:bg-emerald-700"
  },
  red: {
    title: "text-red-400",
    button: "bg-red-600 hover:bg-red-700"
  }
}

/* =========================
   CATEGORÍAS OCULTAS EN UI
========================= */
const HIDDEN_CATEGORIES = [
  "Transferencias entre cuentas",
  "Reajuste de saldo"
]

export default function CategoriasColumn({
  title,
  categorias = [],
  color = "emerald",
  onCreate,
  onEdit,
  onDelete
}) {
  const styles = COLORS[color]

  /* =========================
     FILTRO DE VISUALIZACIÓN
  ========================= */
  const categoriasVisibles = categorias.filter(
    c => !HIDDEN_CATEGORIES.includes(c.nombre)
  )

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-semibold ${styles.title}`}>
          {title}
        </h2>

        <button
          onClick={onCreate}
          className={`${styles.button} px-3 py-1.5 rounded-md text-sm font-medium transition`}
        >
          Nueva
        </button>
      </div>

      {categoriasVisibles.length === 0 ? (
        <p className="text-slate-400 text-sm">
          No hay categorías registradas
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="text-left py-2">Nombre</th>
              <th className="w-24 text-right py-2"></th>
            </tr>
          </thead>
          <tbody>
            {categoriasVisibles.map(cat => (
              <tr
                key={cat.id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="py-2">{cat.nombre}</td>

                <td className="py-2 text-right space-x-3">
                  <button
                    onClick={() => onEdit(cat)}
                    className="text-slate-300 hover:text-white"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(cat.id)}
                    className="text-red-400 hover:text-red-300"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
