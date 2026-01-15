import { Pencil, Trash2 } from "lucide-react"

export default function FlujosTable({
  flujos = [],
  categorias = [],
  cuentas = [],
  onEdit,
  onDelete
}) {
  const catMap = Object.fromEntries(
    categorias.map(c => [c.id, c.nombre])
  )

  const cuentaMap = Object.fromEntries(
    cuentas.map(c => [c.id, c.nombre])
  )

  return (
    <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Cuenta</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Monto</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {flujos.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                No hay movimientos para mostrar
              </td>
            </tr>
          )}

          {flujos.map(f => (
            <tr key={f.id} className="border-t border-slate-800">
              <td className="px-4 py-3">{f.fecha}</td>
              <td className="px-4 py-3">{f.descripcion}</td>
              <td className="px-4 py-3">
                {catMap[f.categoria_id] || "—"}
              </td>
              <td className="px-4 py-3">
                {cuentaMap[f.cuenta_id] || "—"}
              </td>

              <td
                className={`px-4 py-3 font-semibold ${
                  f.tipo_movimiento === "Ingreso"
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {f.tipo_movimiento}
              </td>

              <td className="px-4 py-3">
                ${Number(f.monto).toLocaleString("es-CO")}
              </td>

              <td className="px-4 py-3 flex justify-end gap-2">
                <button onClick={() => onEdit(f)}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(f.id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
