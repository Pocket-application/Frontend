import { useEffect, useState } from "react"
import {
  createCuenta,
  updateCuenta
} from "../../api/cuentas.api"

export default function EditCuentaModal({
  cuenta,
  onClose,
  onSuccess
}) {
  const isEdit = !!cuenta.id

  const [nombre, setNombre] = useState("")

  useEffect(() => {
    setNombre(cuenta.nombre || "")
  }, [cuenta])

  const submit = async e => {
    e.preventDefault()

    if (isEdit) {
      await updateCuenta(cuenta.id, { nombre })
    } else {
      await createCuenta({ nombre })
    }

    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-slate-900 rounded-2xl p-6 w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {isEdit ? "Editar cuenta" : "Nueva cuenta"}
        </h2>

        <input
          className="input w-full"
          placeholder="Nombre de la cuenta"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          autoFocus
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
