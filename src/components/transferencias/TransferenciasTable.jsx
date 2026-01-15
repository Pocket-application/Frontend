import { Pencil, Trash2 } from "lucide-react"

export default function TransferenciasTable({
  transferencias = [],
  cuentas = [],
  onEdit,
  onDelete
}) {
  const cuentaMap = Object.fromEntries(
    (cuentas || []).map(c => [c.id, c.nombre])
  )

  return (
    <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Cuenta origen</th>
            <th className="px-4 py-3">Cuenta destino</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Monto</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {transferencias.map(t => (
            <tr key={t.id} className="border-t border-slate-800">
              <td className="px-4 py-3">
                {new Date(t.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                {cuentaMap[t.cuenta_origen_id] || "—"}
              </td>
              <td className="px-4 py-3">
                {cuentaMap[t.cuenta_destino_id] || "—"}
              </td>
              <td className="px-4 py-3">{t.descripcion}</td>
              <td className="px-4 py-3 font-semibold">
                ${Number(t.monto).toLocaleString("es-CO")}
              </td>
              <td className="px-4 py-3 flex justify-end gap-2">
                <button onClick={() => onEdit(t)}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(t.id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}

          {transferencias.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-slate-400"
              >
                No hay transferencias para el período seleccionado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
