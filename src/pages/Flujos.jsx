import { useEffect, useMemo, useState } from "react"
import Navbar from "../components/Navbar"

import { getFlujos, deleteFlujo } from "../api/flujo.api"
import { getCategorias } from "../api/categorias.api"
import { getCuentas } from "../api/cuentas.api"

import FlujosHeader from "../components/flujos/FlujosHeader"
import FlujosTable from "../components/flujos/FlujosTable"
import Pagination from "../components/flujos/Pagination"
import MonthPickerModal from "../components/flujos/MonthPickerModal"
import AdvancedSearchModal from "../components/flujos/AdvancedSearchModal"
import DeleteFlujoModal from "../components/flujos/DeleteFlujoModal"
import EditFlujoModal from "../components/flujos/EditFlujoModal"
import PeriodTotals from "../components/flujos/PeriodTotals"

export default function Flujos() {
  const [flujos, setFlujos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cuentas, setCuentas] = useState([])

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  const [openMonth, setOpenMonth] = useState(false)
  const [openAdvanced, setOpenAdvanced] = useState(false)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  const [editFlujo, setEditFlujo] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  // filtros
  const [categoriaId, setCategoriaId] = useState("")
  const [tipo, setTipo] = useState("")

  useEffect(() => {
    Promise.all([
      getFlujos(),
      getCategorias(),
      getCuentas()
    ]).then(([f, c, cu]) => {
      setFlujos(f)
      setCategorias(c)
      setCuentas(cu)
    })
  }, [])

  // excluir transferencias internas
  const transferCategoryIds = categorias
    .filter(c => c.nombre === "Transferencias entre cuentas")
    .map(c => c.id)

  const filtered = useMemo(() => {
    return flujos.filter(f => {
      if (transferCategoryIds.includes(f.categoria_id)) return false
      if (categoriaId && f.categoria_id !== Number(categoriaId)) return false
      if (tipo && f.tipo_movimiento !== tipo) return false

      const date = new Date(f.fecha)

      if (startDate && endDate) {
        return date >= new Date(startDate) && date <= new Date(endDate)
      }

      return (
        date.getMonth() === month &&
        date.getFullYear() === year
      )
    })
  }, [
    flujos,
    categorias,
    month,
    year,
    startDate,
    endDate,
    categoriaId,
    tipo
  ])

  // 👉 TOTALES DEL PERÍODO FILTRADO
  const totals = useMemo(() => {
    let ingresos = 0
    let egresos = 0

    filtered.forEach(f => {
      if (f.tipo_movimiento === "Ingreso") ingresos += f.monto
      if (f.tipo_movimiento === "Egreso") egresos += f.monto
    })

    return { ingresos, egresos }
  }, [filtered])

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  const reload = async () => {
    const data = await getFlujos()
    setFlujos(data)
  }

  const handleDelete = async () => {
    try {
      await deleteFlujo(deleteId)
      await reload()
      setDeleteId(null)
    } catch (err) {
      console.error("Error eliminando flujo:", err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <FlujosHeader
          categorias={categorias}
          categoriaId={categoriaId}
          setCategoriaId={setCategoriaId}
          tipo={tipo}
          setTipo={setTipo}
          onMonth={() => setOpenMonth(true)}
          onAdvanced={() => setOpenAdvanced(true)}
        />

        {/* 👇 RESUMEN FINANCIERO DEL PERÍODO */}
        <PeriodTotals
          ingresos={totals.ingresos}
          egresos={totals.egresos}
        />

        <FlujosTable
          flujos={paginated}
          categorias={categorias}
          cuentas={cuentas}
          onEdit={setEditFlujo}
          onDelete={setDeleteId}
        />

        <Pagination
          total={filtered.length}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </main>

      {/* MODALES */}
      <MonthPickerModal
        open={openMonth}
        onClose={() => setOpenMonth(false)}
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />

      <AdvancedSearchModal
        open={openAdvanced}
        onClose={() => setOpenAdvanced(false)}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <EditFlujoModal
        flujo={editFlujo}
        cuentas={cuentas}
        categorias={categorias}
        onClose={() => setEditFlujo(null)}
        onSuccess={reload}
      />

      <DeleteFlujoModal
        id={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

    </div>
  )
}
