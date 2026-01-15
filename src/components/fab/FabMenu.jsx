import { useState } from "react"
import ActionSheet from "./ActionSheet"
import CreateCuentaModal from "./CreateCuentaModal"
import CreateCategoriaModal from "./CreateCategoriaModal"
import CreateMovimientoModal from "./CreateMovimientoModal"
import CreateTransferenciaModal from "./CreateTransferenciaModal"
import reloadDashboard from "../../pages/Dashboard"

export default function FabMenu() {
  const [sheet, setSheet] = useState(false)
  const [modal, setModal] = useState(null)

  return (
    <>
      <button
        onClick={() => setSheet(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-500 text-black text-3xl z-50"
      >
        +
      </button>

      <ActionSheet
        open={sheet}
        onClose={() => setSheet(false)}
        onSelect={key => {
          setSheet(false)
          setModal(key)
        }}
      />

      <CreateCuentaModal open={modal === "cuenta"} onClose={() => setModal(null)} onSuccess={reloadDashboard} />
      <CreateTransferenciaModal open={modal === "transferencia"} onClose={() => setModal(null)} onSuccess={reloadDashboard} />
      <CreateCategoriaModal open={modal === "categoria"} onClose={() => setModal(null)} onSuccess={reloadDashboard} />
      <CreateMovimientoModal open={modal === "movimiento"} onClose={() => setModal(null)} onSuccess={reloadDashboard} />
    </>
  )
}
