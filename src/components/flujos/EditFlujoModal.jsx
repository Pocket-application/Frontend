import { useEffect, useState } from "react"
import Modal from "../ui/Modal"
import { updateFlujo } from "../../api/flujo.api"

export default function EditFlujoModal({
  flujo,
  cuentas,
  categorias,
  onClose,
  onSuccess
}) {
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (flujo) setForm(flujo)
  }, [flujo])

  if (!form) return null

  const submit = async () => {
    await updateFlujo(form.id, {
      descripcion: form.descripcion,
      monto: Number(form.monto),
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
        type="number"
        className="input"
        value={form.monto}
        onChange={e =>
          setForm({ ...form, monto: e.target.value })
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
