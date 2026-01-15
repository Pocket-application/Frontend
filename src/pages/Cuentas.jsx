import { useEffect, useMemo, useState } from "react"
import Navbar from "../components/Navbar"

import {
  getCuentas,
  deleteCuenta
} from "../api/cuentas.api"

import { getSaldosPorCuenta } from "../api/saldos.api"

import CuentasTable from "../components/cuentas/CuentasTable"
import EditCuentaModal from "../components/cuentas/EditCuentaModal"
import DeleteCuentaModal from "../components/cuentas/DeleteCuentaModal"
import ReajusteSaldoModal from "../components/cuentas/ReajusteSaldoModal"

export default function Cuentas() {
  const [cuentas, setCuentas] = useState([])
  const [saldos, setSaldos] = useState([])

  const [editCuenta, setEditCuenta] = useState(null)
  const [deleteCuentaData, setDeleteCuentaData] = useState(null)
  const [reajusteCuenta, setReajusteCuenta] = useState(null)

  const loadData = async () => {
    const [c, s] = await Promise.all([
      getCuentas(),
      getSaldosPorCuenta()
    ])
    setCuentas(c)
    setSaldos(s)
  }

  useEffect(() => {
    loadData()
  }, [])

  const cuentasConSaldo = useMemo(() => {
    return cuentas.map(cuenta => {
      const saldo = saldos.find(s => s.cuenta_id === cuenta.id)
      return {
        ...cuenta,
        saldo: saldo ? Number(saldo.saldo) : 0
      }
    })
  }, [cuentas, saldos])

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Cuentas</h1>
        </div>

        <CuentasTable
          cuentas={cuentasConSaldo}
          onEdit={setEditCuenta}
          onDelete={setDeleteCuentaData}
          onReajuste={setReajusteCuenta}
        />
      </main>

      {/* MODALES */}

      {editCuenta && (
        <EditCuentaModal
          cuenta={editCuenta}
          onClose={() => setEditCuenta(null)}
          onSuccess={loadData}
        />
      )}

      {deleteCuentaData && (
        <DeleteCuentaModal
          cuenta={deleteCuentaData}
          onClose={() => setDeleteCuentaData(null)}
          onConfirm={async () => {
            await deleteCuenta(deleteCuentaData.id)
            setDeleteCuentaData(null)
            loadData()
          }}
        />
      )}

      {reajusteCuenta && (
        <ReajusteSaldoModal
          cuenta={reajusteCuenta}
          onClose={() => setReajusteCuenta(null)}
          onSuccess={loadData}
        />
      )}
    </div>
  )
}
