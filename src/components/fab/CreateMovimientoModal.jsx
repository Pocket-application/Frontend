import { useEffect, useState } from "react"
import Modal from "../ui/Modal"
import { createFlujo } from "../../api/flujo.api"
import { getCuentas } from "../../api/cuentas.api"
import { getCategorias } from "../../api/categorias.api"

// 👉 helper para fecha actual en formato YYYY-MM-DD
const todayISO = () => new Date().toISOString().split("T")[0]

export default function CreateMovimientoModal({ open, onClose, onSuccess  }) {
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
    estado: "Pendiente",
    tipo_egreso: ""
  })

  /* =========================
     CARGA Y RESET AL ABRIR
  ========================= */
  useEffect(() => {
    if (!open) return

    // reset completo del modal
    setStep(1)
    setTipo(null)
    setForm({
      fecha: todayISO(),
      descripcion: "",
      monto: "",
      cuenta_id: "",
      categoria_id: "",
      estado: "Pendiente",
      tipo_egreso: ""
    })

    getCuentas().then(setCuentas)
    getCategorias().then(setCategorias)
  }, [open])

  /* =========================
     SUBMIT
  ========================= */
  const submit = async () => {
    await createFlujo({
      ...form,
      tipo_movimiento: tipo,
      tipo_egreso: tipo === "Egreso" ? form.tipo_egreso : null
    })

    onSuccess?.()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Crear movimiento">
      {/* =========================
         STEP 1 - TIPO
      ========================= */}
      {step === 1 && (
        <>
          <p className="text-sm text-slate-400">
            ¿Qué tipo de movimiento deseas crear?
          </p>

          <button
            onClick={() => {
              setTipo("Ingreso")
              setStep(2)
            }}
            className="btn-primary w-full"
          >
            Ingreso
          </button>

          <button
            onClick={() => {
              setTipo("Egreso")
              setStep(2)
            }}
            className="btn-secondary w-full"
          >
            Egreso
          </button>
        </>
      )}

      {/* =========================
         STEP 2 - FORM
      ========================= */}
      {step === 2 && (
        <>
          <input
            type="date"
            className="input"
            value={form.fecha}
            onChange={e => setForm({ ...form, fecha: e.target.value })}
          />

          <input
            className="input"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
          />

          <input
            type="number"
            className="input"
            placeholder="Monto"
            value={form.monto}
            onChange={e => setForm({ ...form, monto: e.target.value })}
          />

          <select
            className="input"
            value={form.cuenta_id}
            onChange={e => setForm({ ...form, cuenta_id: e.target.value })}
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
            onChange={e => setForm({ ...form, categoria_id: e.target.value })}
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

          <select
            className="input"
            value={form.estado}
            onChange={e => setForm({ ...form, estado: e.target.value })}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
          </select>

          <button onClick={submit} className="btn-primary w-full">
            Crear movimiento
          </button>
        </>
      )}
    </Modal>
  )
}
