import { useEffect, useState } from "react"
import Modal from "../ui/Modal"
import { createTransferencia } from "../../api/transferencias.api"
import { getCuentas } from "../../api/cuentas.api"

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

export default function CreateTransferenciaModal({ open, onClose, onSuccess }) {
  const [cuentas, setCuentas] = useState([])
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    cuenta_origen_id: "",
    cuenta_destino_id: "",
    monto: "",
    descripcion: ""
  })

  useEffect(() => {
    if (!open) return
    setError("")
    setForm({ cuenta_origen_id: "", cuenta_destino_id: "", monto: "", descripcion: "" })
    getCuentas().then(setCuentas)
  }, [open])

  const submit = async () => {
    const montoNumerico = parseDecimalInput(form.monto)
    if (!Number.isFinite(montoNumerico)) {
      setError("Monto inválido")
      return
    }

    await createTransferencia({
      ...form,
      monto: montoNumerico,
      cuenta_origen_id: Number(form.cuenta_origen_id),
      cuenta_destino_id: Number(form.cuenta_destino_id)
    })

    onSuccess?.()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Crear transferencia">
      {/* inputs iguales + monto seguro */}
      <input
        type="text"
        inputMode="decimal"
        className="input"
        placeholder="Monto"
        value={form.monto}
        onChange={e =>
          setForm({ ...form, monto: e.target.value.replace(/[^0-9.,\s]/g, "") })
        }
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button onClick={submit} className="btn-primary w-full">
        Crear transferencia
      </button>
    </Modal>
  )
}
