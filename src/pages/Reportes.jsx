import { useEffect, useMemo, useState } from "react"
import Navbar from "../components/Navbar"

import { getFlujos } from "../api/flujo.api"
import { getCuentas } from "../api/cuentas.api"
import { getCategorias } from "../api/categorias.api"

import ReportesHeader from "../components/reportes/ReportesHeader"
import ResumenGeneral from "../components/reportes/ResumenGeneral"
import CategoriasChart from "../components/reportes/CategoriasChart"
import CuentasChart from "../components/reportes/CuentasChart"
import EvolucionChart from "../components/reportes/EvolucionChart"
import FiltersModal from "../components/reportes/FiltersModal"

export default function Reportes() {
  const [flujos, setFlujos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cuentas, setCuentas] = useState([])

  const [openFilters, setOpenFilters] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [tipo, setTipo] = useState("")
  const [categoriaId, setCategoriaId] = useState("")
  const [cuentaId, setCuentaId] = useState("")

  useEffect(() => {
    Promise.all([getFlujos(), getCategorias(), getCuentas()]).then(
      ([f, c, cu]) => {
        setFlujos(f)
        setCategorias(c)
        setCuentas(cu)
      }
    )
  }, [])

  // Filtrar movimientos según filtros
  const filteredFlujos = useMemo(() => {
    return flujos.filter(f => {
      const date = new Date(f.fecha)
      if (startDate && endDate) {
        if (date < new Date(startDate) || date > new Date(endDate)) return false
      }
      if (tipo && f.tipo_movimiento !== tipo) return false
      if (categoriaId && f.categoria_id !== Number(categoriaId)) return false
      if (cuentaId && (f.cuenta_id !== Number(cuentaId) && f.cuenta_destino_id !== Number(cuentaId))) return false
      return true
    })
  }, [flujos, startDate, endDate, tipo, categoriaId, cuentaId])

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <ReportesHeader onFilters={() => setOpenFilters(true)} />

        {/* 1️⃣ Resumen General */}
        <ResumenGeneral flujos={filteredFlujos} cuentas={cuentas} />

        {/* 2️⃣ Visualización por categorías */}
        <CategoriasChart flujos={filteredFlujos} categorias={categorias} />

        {/* 3️⃣ Visualización por cuentas */}
        <CuentasChart flujos={filteredFlujos} cuentas={cuentas} />

        {/* 4️⃣ Evolución en el tiempo */}
        <EvolucionChart flujos={filteredFlujos} />

      </main>

      <FiltersModal
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        tipo={tipo}
        setTipo={setTipo}
        categorias={categorias}
        categoriaId={categoriaId}
        setCategoriaId={setCategoriaId}
        cuentas={cuentas}
        cuentaId={cuentaId}
        setCuentaId={setCuentaId}
      />
    </div>
  )
}
