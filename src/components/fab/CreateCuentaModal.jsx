import { useState } from "react"
import Modal from "../ui/Modal"
import { createCuenta } from "../../api/cuentas.api"

export default function CreateCuentaModal({ open, onClose, onSuccess  }) {
  const [nombre, setNombre] = useState("")

  const submit = async () => {
    await createCuenta({ nombre })
    onSuccess?.()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Crear cuenta">
      <input
        className="w-full input"
        placeholder="Nombre de la cuenta"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <button onClick={submit} className="btn-primary w-full">
        Crear
      </button>
    </Modal>
  )
}
