import { useEffect, useState } from "react"
import Modal from "../ui/Modal"
import { createFlujo } from "../../api/flujo.api"
import { getCuentas } from "../../api/cuentas.api"
import { getCategorias } from "../../api/categorias.api"

const todayISO = () => new Date().toISOString().split("T")[0]

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

export default function CreateMovimientoModal({ open, onClose, onSuccess }) {
  const [step, setStep] = useState(1)
  const [tipo, setTipo] = useState(null)
  const [cuentas, setCuentas] = useState([])
  const [categorias, setCategorias] = useState([])

  const [form, setForm] = useState({
    fecha: todayISO(),
    descripcion: "",
    monto: "",
    cuenta_id: "",
    categoria_id: "",
    estado: "Confirmado",
    tipo_egreso: ""
  })

  useEffect(() => {
    if (!open) return

    setStep(1)
    setTipo(null)
    setForm({
      fecha: todayISO(),
      descripcion: "",
      monto: "",
      cuenta_id: "",
      categoria_id: "",
      estado: "Confirmado",
      tipo_egreso: ""
    })

    getCuentas().then(setCuentas)
    getCategorias().then(setCategorias)
  }, [open])

  const submit = async () => {
    const montoNumerico = parseDecimalInput(form.monto)

    if (!Number.isFinite(montoNumerico)) {
      alert("Monto inválido")
      return
    }

    if (tipo === "Egreso" && !form.categoria_id) {
      alert("Debe seleccionar una categoría")
      return
    }

    await createFlujo({
      fecha: form.fecha,
      descripcion: form.descripcion,
      monto: montoNumerico,
      cuenta_id: Number(form.cuenta_id),
      categoria_id: Number(form.categoria_id),
      tipo_movimiento: tipo,
      tipo_egreso: tipo === "Egreso" ? form.tipo_egreso : null,
      estado: form.estado
    })

    onSuccess?.()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Crear movimiento">
      {step === 1 && (
        <>
          <button
            className="btn-primary w-full mb-2"
            onClick={() => {
              setTipo("Ingreso")
              setStep(2)
            }}
          >
            Ingreso
          </button>

          <button
            className="w-full py-2 rounded-md bg-red-600 text-white"
            onClick={() => {
              setTipo("Egreso")
              setStep(2)
            }}
          >
            Egreso
          </button>
        </>
      )}

      {step === 2 && (
        <>
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
            <option value="">Cuenta</option>
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
              .filter(c => c.tipo_movimiento === tipo)
              .map(c => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
          </select>

          {tipo === "Egreso" && (
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

          <button onClick={submit} className="btn-primary w-full">
            Crear movimiento
          </button>
        </>
      )}
    </Modal>
  )
}
