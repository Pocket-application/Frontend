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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (flujo) {
      setForm({
        id: flujo.id,
        fecha: flujo.fecha,
        descripcion: flujo.descripcion,
        monto: String(flujo.monto),
        cuenta_id: flujo.cuenta_id,
        categoria_id: flujo.categoria_id,
        estado: flujo.estado,
        tipo_movimiento: flujo.tipo_movimiento,
        tipo_egreso: flujo.tipo_egreso ?? ""
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

    if (
      form.tipo_movimiento === "Egreso" &&
      !form.categoria_id
    ) {
      alert("Debe seleccionar una categoría para egresos")
      return
    }

    try {
      setLoading(true)

      await updateFlujo(form.id, {
        fecha: form.fecha,
        descripcion: form.descripcion,
        monto: montoNumerico,
        cuenta_id: Number(form.cuenta_id),
        categoria_id: Number(form.categoria_id),
        estado: form.estado,
        tipo_egreso:
          form.tipo_movimiento === "Egreso"
            ? form.tipo_egreso
            : null
      })

      onSuccess()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={!!flujo} onClose={onClose} title="Editar movimiento">
      <input
        type="date"
        className="input"
        value={form.fecha}
        onChange={e =>
          setForm({ ...form, fecha: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={e =>
          setForm({ ...form, descripcion: e.target.value })
        }
      />

      <input
        type="text"
        inputMode="decimal"
        className="input"
        placeholder="Monto"
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
        <option value="">Categoría</option>
        {categorias
          .filter(c => c.tipo_movimiento === form.tipo_movimiento)
          .map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
      </select>

      {form.tipo_movimiento === "Egreso" && (
        <select
          className="input"
          value={form.tipo_egreso}
          onChange={e =>
            setForm({ ...form, tipo_egreso: e.target.value })
          }
        >
          <option value="">Tipo de egreso</option>
          <option value="Fijo">Fijo</option>
          <option value="Variable">Variable</option>
        </select>
      )}

      <select
        className="input"
        value={form.estado}
        onChange={e =>
          setForm({ ...form, estado: e.target.value })
        }
      >
        <option value="Confirmado">Confirmado</option>
        <option value="Pendiente">Pendiente</option>
      </select>

      <button
        onClick={submit}
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </Modal>
  )
}
