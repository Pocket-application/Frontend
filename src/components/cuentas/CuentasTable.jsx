import { Pencil, Trash2, Scale } from "lucide-react"

export default function CuentasTable({
  cuentas = [],
  onEdit,
  onDelete,
  onReajuste
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-4 py-3 text-left">Cuenta</th>
            <th className="px-4 py-3 text-right">Saldo</th>
            <th className="px-4 py-3 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {cuentas.map(c => (
            <tr
              key={c.id}
              className="border-t border-slate-800 hover:bg-slate-800/40"
            >
              <td className="px-4 py-3">{c.nombre}</td>

              <td className="px-4 py-3 text-right font-semibold">
                {c.saldo.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>

              <td className="px-4 py-3 flex justify-end gap-3">
                <button
                  onClick={() => onReajuste(c)}
                  title="Reajustar saldo"
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <Scale size={16} />
                </button>

                <button
                  onClick={() => onEdit(c)}
                  title="Editar"
                  className="text-slate-300 hover:text-white"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(c)}
                  title="Eliminar"
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}

          {cuentas.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-6 text-center text-slate-400"
              >
                No hay cuentas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
