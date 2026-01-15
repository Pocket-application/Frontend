import { useEffect, useMemo, useState } from "react"
import Navbar from "../components/Navbar"

import {
  getTransferencias,
  deleteTransferencia
} from "../api/transferencias.api"

import { getCuentas } from "../api/cuentas.api"

import TransferenciasHeader from "../components/transferencias/TransferenciasHeader"
import TransferenciasTable from "../components/transferencias/TransferenciasTable"
import Pagination from "../components/transferencias/Pagination"
import MonthPickerModal from "../components/transferencias/MonthPickerModal"
import AdvancedSearchModal from "../components/transferencias/AdvancedSearchModal"
import EditTransferenciaModal from "../components/transferencias/EditTransferenciaModal"
import DeleteTransferenciaModal from "../components/transferencias/DeleteTransferenciaModal"

export default function Transferencias() {
  const [transferencias, setTransferencias] = useState([])
  const [cuentas, setCuentas] = useState([])

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [openMonth, setOpenMonth] = useState(false)
  const [openAdvanced, setOpenAdvanced] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [editTransferencia, setEditTransferencia] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    Promise.all([
      getTransferencias(),
      getCuentas()
    ]).then(([t, c]) => {
      setTransferencias(t)
      setCuentas(c)
    })
  }, [])

  const filtered = useMemo(() => {
    return transferencias.filter(t => {
      const date = new Date(t.created_at)

      if (startDate && endDate) {
        return date >= new Date(startDate) && date <= new Date(endDate)
      }

      return (
        date.getMonth() === month &&
        date.getFullYear() === year
      )
    })
  }, [transferencias, month, year, startDate, endDate])

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  const reload = async () => {
    const data = await getTransferencias()
    setTransferencias(data)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <TransferenciasHeader
          onMonth={() => setOpenMonth(true)}
          onAdvanced={() => setOpenAdvanced(true)}
        />

        <TransferenciasTable
          transferencias={paginated}
          cuentas={cuentas}
          onEdit={setEditTransferencia}
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

      <EditTransferenciaModal
        transferencia={editTransferencia}
        cuentas={cuentas}
        onClose={() => setEditTransferencia(null)}
        onSuccess={reload}
      />

      <DeleteTransferenciaModal
        id={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteTransferencia(deleteId)
          setDeleteId(null)
          reload()
        }}
      />
    </div>
  )
}
