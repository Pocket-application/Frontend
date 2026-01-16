import { useEffect, useMemo, useState } from "react"
import Navbar from "../components/Navbar"

import {
  getCategorias,
  deleteCategoria
} from "../api/categorias.api"

import CategoriasColumn from "../components/categorias/CategoriasColumn"
import EditCategoriaModal from "../components/categorias/EditCategoriaModal"
import DeleteCategoriaModal from "../components/categorias/DeleteCategoriaModal"

export default function Categorias() {
  const [categorias, setCategorias] = useState([])

  const [editCategoria, setEditCategoria] = useState(null)
  const [createTipo, setCreateTipo] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const loadCategorias = async () => {
    const data = await getCategorias()
    setCategorias(data)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCategorias()
  }, [])

  const ingresos = useMemo(
    () => categorias.filter(c => c.tipo_movimiento === "Ingreso"),
    [categorias]
  )

  const egresos = useMemo(
    () => categorias.filter(c => c.tipo_movimiento === "Egreso"),
    [categorias]
  )

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <h1 className="text-3xl font-bold">Categorías</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoriasColumn
            title="Ingresos"
            categorias={ingresos}
            color="emerald"
            onCreate={() => setCreateTipo("Ingreso")}
            onEdit={setEditCategoria}
            onDelete={setDeleteId}
          />

          <CategoriasColumn
            title="Egresos"
            categorias={egresos}
            color="red"
            onCreate={() => setCreateTipo("Egreso")}
            onEdit={setEditCategoria}
            onDelete={setDeleteId}
          />
        </div>
      </main>

      {/* MODALES */}
      {(editCategoria || createTipo) && (
        <EditCategoriaModal
            categoria={
            editCategoria ?? {
                nombre: "",
                tipo_movimiento: createTipo
            }
            }
            onClose={() => {
            setEditCategoria(null)
            setCreateTipo(null)
            }}
            onSuccess={loadCategorias}
        />
        )}

      <DeleteCategoriaModal
        id={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteCategoria(deleteId)
          setDeleteId(null)
          loadCategorias()
        }}
      />
    </div>
  )
}
