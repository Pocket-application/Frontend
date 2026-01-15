import { useState } from "react"
import ActionSheet from "./ActionSheet"
import CreateCuentaModal from "./CreateCuentaModal"
import CreateCategoriaModal from "./CreateCategoriaModal"
import CreateMovimientoModal from "./CreateMovimientoModal"
import CreateTransferenciaModal from "./CreateTransferenciaModal"

export default function FabMenu({ onSuccess }) {
  const [sheet, setSheet] = useState(false)
  const [modal, setModal] = useState(null)

  const close = () => setModal(null)

  return (
    <>
      <button
        onClick={() => setSheet(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full
                   bg-emerald-500 text-black text-3xl z-50"
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

      <CreateCuentaModal
        open={modal === "cuenta"}
        onClose={close}
        onSuccess={onSuccess}
      />

      <CreateTransferenciaModal
        open={modal === "transferencia"}
        onClose={close}
        onSuccess={onSuccess}
      />

      <CreateCategoriaModal
        open={modal === "categoria"}
        onClose={close}
        onSuccess={onSuccess}
      />

      <CreateMovimientoModal
        open={modal === "movimiento"}
        onClose={close}
        onSuccess={onSuccess}
      />
    </>
  )
}
