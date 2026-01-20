import { useEffect, useState } from "react"
import Modal from "../ui/Modal"
import { updateFlujo } from "../../api/flujo.api"

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

export default function EditFlujoModal({
  flujo,
  cuentas,
  categorias,
  onClose,
  onSuccess
}) {
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (flujo) {
      setForm({
        ...flujo,
        monto: String(flujo.monto)
      })
    }
  }, [flujo])

  if (!form) return null

  const submit = async () => {
    const montoNumerico = parseDecimalInput(form.monto)

    if (!Number.isFinite(montoNumerico)) {
      alert("Monto inválido")
      return
    }

    await updateFlujo(form.id, {
      descripcion: form.descripcion,
      monto: montoNumerico,
      cuenta_id: Number(form.cuenta_id),
      categoria_id: Number(form.categoria_id)
    })

    onSuccess()
    onClose()
  }

  return (
    <Modal open={!!flujo} onClose={onClose} title="Editar movimiento">
      <input
        className="input"
        value={form.descripcion}
        onChange={e =>
          setForm({ ...form, descripcion: e.target.value })
        }
      />

      <input
        type="text"
        inputMode="decimal"
        className="input"
        value={form.monto}
        onChange={e =>
          setForm({
            ...form,
            monto: e.target.value.replace(/[^0-9.,\s]/g, "")
          })
        }
      />

      <select
        className="input"
        value={form.cuenta_id}
        onChange={e =>
          setForm({ ...form, cuenta_id: e.target.value })
        }
      >
        {cuentas.map(c => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <select
        className="input"
        value={form.categoria_id}
        onChange={e =>
          setForm({ ...form, categoria_id: e.target.value })
        }
      >
        {categorias
          .filter(c => c.tipo_movimiento === form.tipo_movimiento)
          .map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
      </select>

      <button onClick={submit} className="btn-primary w-full">
        Guardar cambios
      </button>
    </Modal>
  )
}
