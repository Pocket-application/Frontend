import { useState } from "react"
import Modal from "../ui/Modal"
import { createCategoria } from "../../api/categorias.api"

export default function CreateCategoriaModal({ open, onClose, onSuccess  }) {
  const [nombre, setNombre] = useState("")
  const [tipo, setTipo] = useState("Ingreso")

  const submit = async () => {
    await createCategoria({
      nombre,
      tipo_movimiento: tipo
    })
    onSuccess?.()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Crear categoría">
      <input
        className="w-full input"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <select
        className="w-full input"
        value={tipo}
        onChange={e => setTipo(e.target.value)}
      >
        <option value="Ingreso">Ingreso</option>
        <option value="Egreso">Egreso</option>
      </select>

      <button onClick={submit} className="btn-primary w-full">
        Crear
      </button>
    </Modal>
  )
}
