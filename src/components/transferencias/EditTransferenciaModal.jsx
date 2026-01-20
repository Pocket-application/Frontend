import { useEffect, useState } from "react"
import { updateTransferencia } from "../../api/transferencias.api"

/* =========================
   DECIMAL PARSER
========================= */
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
  const [loading, setLoading] = useState(false)

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

    try {
      setLoading(true)

      await updateTransferencia(transferencia.id, {
        cuenta_origen_id: Number(form.cuenta_origen_id),
        cuenta_destino_id: Number(form.cuenta_destino_id),
        monto: montoNumerico,
        descripcion: form.descripcion
      })

      onSuccess()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-2xl p-6 w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          Editar transferencia
        </h2>

        <select
          className="input w-full"
          value={form.cuenta_origen_id}
          onChange={e =>
            setForm({ ...form, cuenta_origen_id: e.target.value })
          }
        >
          {cuentas.map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          className="input w-full"
          value={form.cuenta_destino_id}
          onChange={e =>
            setForm({ ...form, cuenta_destino_id: e.target.value })
          }
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
          className="input w-full"
          placeholder="Monto"
          value={form.monto}
          onChange={e =>
            setForm({
              ...form,
              monto: e.target.value.replace(/[^0-9.,\s]/g, "")
            })
          }
        />

        <input
          className="input w-full"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={e =>
            setForm({ ...form, descripcion: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  )
}
