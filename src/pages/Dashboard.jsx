import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"
import { useGreeting } from "../hooks/useGreeting"
import { getSaldosPorCuenta } from "../api/saldos.api"
import { getFlujos } from "../api/flujo.api"
import { getCategorias } from "../api/categorias.api"
import { getCached, setCached } from "../hooks/useDashboardCache"

import DashboardHeader from "../components/dashboard/DashboardHeader"
import BalanceDropdown from "../components/dashboard/BalanceDropdown"
import PeriodSummary from "../components/dashboard/PeriodSummary"
import IncomeExpensePie from "../components/dashboard/IncomeExpensePie"
import SkeletonCard from "../components/dashboard/SkeletonCard"
import MonthPickerModal from "../components/dashboard/MonthPickerModal"
import AdvancedSearchModal from "../components/dashboard/AdvancedSearchModal"
import FabMenu from "../components/fab/FabMenu"

export default function Dashboard() {
  const { user } = useAuth()
  const greeting = useGreeting(user?.nombre)

  const [loading, setLoading] = useState(true)
  const [saldos, setSaldos] = useState([])
  const [ingresos, setIngresos] = useState(0)
  const [egresos, setEgresos] = useState(0)

  // 🔹 DATA BASE
  const [allFlujos, setAllFlujos] = useState([])
  const [categorias, setCategorias] = useState([])

  /* =========================
     MODALES & FECHAS
  ========================= */
  const now = new Date()
  const [openMonthModal, setOpenMonthModal] = useState(false)
  const [openAdvancedModal, setOpenAdvancedModal] = useState(false)

  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  /* =========================
     CARGA INICIAL
  ========================= */
  useEffect(() => {
    async function load() {
      setLoading(true)

      const cached = getCached("dashboard")
      if (cached) {
        setSaldos(cached.saldos)
        setIngresos(cached.ingresos)
        setEgresos(cached.egresos)
      }

      const [s, f, c] = await Promise.all([
        getSaldosPorCuenta(),
        getFlujos(),
        getCategorias()
      ])

      setSaldos(s)
      setAllFlujos(f)
      setCategorias(c)

      // mes actual por defecto
      filterByMonth(f, c, month, year)

      setLoading(false)
    }

    load()
  }, [])

  /* =========================
     FILTRO POR MES
  ========================= */
  const filterByMonth = (flujos, categorias, m, y) => {
    const from = new Date(y, m, 1)
    const to = new Date(y, m + 1, 0)

    const filtered = flujos.filter(f => {
      const date = new Date(f.fecha)
      return date >= from && date <= to
    })

    processData(filtered, categorias)
  }

  const loadMonth = () => {
    filterByMonth(allFlujos, categorias, month, year)
    setOpenMonthModal(false)
  }

  /* =========================
     FILTRO POR RANGO
  ========================= */
  const loadRange = () => {
    const from = new Date(startDate)
    const to = new Date(endDate)

    const filtered = allFlujos.filter(f => {
      const date = new Date(f.fecha)
      return date >= from && date <= to
    })

    processData(filtered, categorias)
    setOpenAdvancedModal(false)
  }

  /* =========================
     PROCESAMIENTO
  ========================= */
  const processData = (flujos, categorias) => {
    const transferIds = categorias
      .filter(c => c.nombre === "Transferencias entre cuentas")
      .map(c => c.id)

    let ing = 0
    let egr = 0

    flujos.forEach(m => {
      if (transferIds.includes(m.categoria_id)) return
      m.tipo_movimiento === "Ingreso"
        ? ing += m.monto
        : egr += m.monto
    })

    setIngresos(ing)
    setEgresos(egr)

    setCached("dashboard", {
      saldos,
      ingresos: ing,
      egresos: egr
    })
  }

  /* =========================
     Reload Dashboard
  ========================= */

  const reloadDashboard = async () => {
    setLoading(true)

    const [s, f, c] = await Promise.all([
      getSaldosPorCuenta(),
      getFlujos(),
      getCategorias()
    ])

    setSaldos(s)
    setAllFlujos(f)
    setCategorias(c)

    filterByMonth(f, c, month, year)
    setLoading(false)
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <DashboardHeader
          greeting={greeting}
          onOpenMonth={() => setOpenMonthModal(true)}
          onOpenAdvanced={() => setOpenAdvancedModal(true)}
        />

        {loading ? (
          <SkeletonCard />
        ) : (
          <>
            <BalanceDropdown saldos={saldos} />
            <PeriodSummary ingresos={ingresos} egresos={egresos} />
            <IncomeExpensePie ingresos={ingresos} egresos={egresos} />
          </>
        )}
      </main>

      {/* MODALES */}
      <MonthPickerModal
        open={openMonthModal}
        onClose={() => setOpenMonthModal(false)}
        onConfirm={loadMonth}
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />

      <AdvancedSearchModal
        open={openAdvancedModal}
        onClose={() => setOpenAdvancedModal(false)}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onConfirm={loadRange}
      />

      {/* 🔥 FAB MENU */}
      <FabMenu />
    </div>
  )
}
