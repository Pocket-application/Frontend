import { useEffect, useState } from "react"
import { updateTransferencia } from "../../api/transferencias.api"

function parseDecimalInput(value) {
  if (!value) return NaN
  value = value.replace(/\s/g, "")

  const hasComma = value.includes(",")
  const hasDot = value.includes(".")

  if (hasComma && hasDot) {
    if (value.lastIndexOf(",") > value.lastIndexOf(".")) {
      value = value.replace(/\./g, "").replace(",", ".")
    } else {
      value = value.replace(/,/g, "")
    }
  } else if (hasComma) {
    value = value.replace(",", ".")
  }

  return Number(value)
}

export default function EditTransferenciaModal({
  transferencia,
  cuentas = [],
  onClose,
  onSuccess
}) {
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (transferencia) {
      setForm({
        cuenta_origen_id: transferencia.cuenta_origen_id,
        cuenta_destino_id: transferencia.cuenta_destino_id,
        monto: String(transferencia.monto),
        descripcion: transferencia.descripcion
      })
    }
  }, [transferencia])

  if (!transferencia || !form) return null

  const handleSubmit = async e => {
    e.preventDefault()

    const montoNumerico = parseDecimalInput(form.monto)
    if (!Number.isFinite(montoNumerico)) {
      alert("Monto inválido")
      return
    }

    await updateTransferencia(transferencia.id, {
      ...form,
      monto: montoNumerico
    })

    onClose()
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-2xl p-6 w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold">Editar transferencia</h2>

        <select
          value={form.cuenta_origen_id}
          onChange={e =>
            setForm({ ...form, cuenta_origen_id: Number(e.target.value) })
          }
          className="input w-full"
        >
          {cuentas.map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          value={form.cuenta_destino_id}
          onChange={e =>
            setForm({ ...form, cuenta_destino_id: Number(e.target.value) })
          }
          className="input w-full"
        >
          {cuentas.map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <input
          type="text"
          inputMode="decimal"
          value={form.monto}
          onChange={e =>
            setForm({
              ...form,
              monto: e.target.value.replace(/[^0-9.,\s]/g, "")
            })
          }
          className="input w-full"
        />

        <input
          value={form.descripcion}
          onChange={e =>
            setForm({ ...form, descripcion: e.target.value })
          }
          className="input w-full"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
