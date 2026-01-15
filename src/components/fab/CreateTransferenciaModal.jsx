import { useEffect, useState } from "react"
import Modal from "../ui/Modal"
import { createTransferencia } from "../../api/transferencias.api"
import { getCuentas } from "../../api/cuentas.api"

export default function CreateTransferenciaModal({ open, onClose, onSuccess  }) {
  const [cuentas, setCuentas] = useState([])
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    cuenta_origen_id: "",
    cuenta_destino_id: "",
    monto: "",
    descripcion: ""
  })

  /* =========================
     CARGA & RESET
  ========================= */
  useEffect(() => {
    if (!open) return

    setError("")
    setForm({
      cuenta_origen_id: "",
      cuenta_destino_id: "",
      monto: "",
      descripcion: ""
    })

    getCuentas().then(setCuentas)
  }, [open])

  /* =========================
     VALIDACIÓN
  ========================= */
  const isInvalid =
    !form.cuenta_origen_id ||
    !form.cuenta_destino_id ||
    !form.monto ||
    form.cuenta_origen_id === form.cuenta_destino_id

  /* =========================
     SUBMIT
  ========================= */
  const submit = async () => {
    if (form.cuenta_origen_id === form.cuenta_destino_id) {
      setError("La cuenta origen y destino no pueden ser la misma")
      return
    }

    await createTransferencia({
      created_at: new Date().toISOString(),
      cuenta_origen_id: Number(form.cuenta_origen_id),
      cuenta_destino_id: Number(form.cuenta_destino_id),
      monto: Number(form.monto),
      descripcion: form.descripcion
    })

    onSuccess?.()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Crear transferencia">
      <p className="text-sm text-slate-400 mb-2">
        Mueve dinero entre tus cuentas
      </p>

      {/* CUENTA ORIGEN */}
      <select
        className="input"
        value={form.cuenta_origen_id}
        onChange={e =>
          setForm({ ...form, cuenta_origen_id: e.target.value })
        }
      >
        <option value="">Cuenta origen</option>
        {cuentas.map(c => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      {/* CUENTA DESTINO */}
      <select
        className="input"
        value={form.cuenta_destino_id}
        onChange={e =>
          setForm({ ...form, cuenta_destino_id: e.target.value })
        }
      >
        <option value="">Cuenta destino</option>
        {cuentas.map(c => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      {/* MONTO */}
      <input
        type="number"
        className="input"
        placeholder="Monto"
        value={form.monto}
        onChange={e => setForm({ ...form, monto: e.target.value })}
      />

      {/* DESCRIPCIÓN */}
      <input
        className="input"
        placeholder="Descripción (opcional)"
        value={form.descripcion}
        onChange={e =>
          setForm({ ...form, descripcion: e.target.value })
        }
      />

      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}

      <button
        onClick={submit}
        disabled={isInvalid}
        className="btn-primary w-full disabled:opacity-40"
      >
        Crear transferencia
      </button>
    </Modal>
  )
}
