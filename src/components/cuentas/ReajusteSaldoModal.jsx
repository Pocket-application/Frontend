import { useState } from "react"
import { reajustarSaldo } from "../../api/saldos.api"

export default function ReajusteSaldoModal({
  cuenta,
  onClose,
  onSuccess
}) {
  const [saldoReal, setSaldoReal] = useState("")

  const submit = async e => {
    e.preventDefault()

    // Normalizar coma → punto
    const saldoNumerico = Number(
      saldoReal.replace(/\./g, "").replace(",", ".")
    )

    if (isNaN(saldoNumerico)) {
      alert("Ingrese un valor válido")
      return
    }

    await reajustarSaldo({
      cuenta_id: cuenta.id,
      saldo_real: saldoNumerico,
      descripcion: "Reajuste de saldo"
    })

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
          Reajuste de saldo
        </h2>

        <div className="text-sm text-slate-400 space-y-1">
          <p><strong>Cuenta:</strong> {cuenta.nombre}</p>
          <p>
            <strong>Saldo registrado:</strong>{" "}
            {Number(cuenta.saldo).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </div>

        <input
          type="text"
          inputMode="decimal"
          className="input w-full"
          placeholder="Saldo real (ej: 150000.50)"
          value={saldoReal}
          onChange={e => setSaldoReal(e.target.value)}
          required
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
            Reajustar
          </button>
        </div>
      </form>
    </div>
  )
}
