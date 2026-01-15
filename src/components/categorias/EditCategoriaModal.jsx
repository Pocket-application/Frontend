import { useEffect, useState } from "react"
import {
  createCategoria,
  updateCategoria
} from "../../api/categorias.api"

export default function EditCategoriaModal({
  categoria,
  onClose,
  onSuccess
}) {
  const isEdit = !!categoria?.id

  const [form, setForm] = useState({
    nombre: "",
    tipo_movimiento: "Ingreso"
  })

  useEffect(() => {
    if (categoria) {
      setForm({
        nombre: categoria.nombre,
        tipo_movimiento: categoria.tipo_movimiento
      })
    }
  }, [categoria])

  const submit = async e => {
    e.preventDefault()

    if (isEdit) {
      await updateCategoria(categoria.id, form)
    } else {
      await createCategoria(form)
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
          {isEdit ? "Editar categoría" : "Nueva categoría"}
        </h2>

        <input
          className="input w-full"
          placeholder="Nombre"
          value={form.nombre}
          onChange={e =>
            setForm({ ...form, nombre: e.target.value })
          }
          required
          autoFocus
        />

        <select
          className="input w-full"
          value={form.tipo_movimiento}
          onChange={e =>
            setForm({ ...form, tipo_movimiento: e.target.value })
          }
        >
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </select>

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
