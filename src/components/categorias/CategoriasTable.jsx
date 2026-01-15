import { Pencil, Trash2 } from "lucide-react"

export default function CategoriasTable({
  categorias = [],
  onEdit,
  onDelete
}) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {categorias.map(c => (
            <tr key={c.id} className="border-t border-slate-800">
              <td className="px-4 py-3">{c.nombre}</td>

              <td
                className={`px-4 py-3 font-semibold ${
                  c.tipo_movimiento === "Ingreso"
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {c.tipo_movimiento}
              </td>

              <td className="px-4 py-3 flex justify-end gap-2">
                <button onClick={() => onEdit(c)}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(c.id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}

          {categorias.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-6 text-center text-slate-400"
              >
                No hay categorías registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
