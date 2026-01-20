import { useState } from "react"
import { reajustarSaldo } from "../../api/saldos.api"

/**
 * Convierte entradas humanas a número decimal válido
 * Acepta:
 *  - 150000.50
 *  - 150000,50
 *  - 1.500.000,25
 *  - 1,500,000.25
 */
function parseDecimalInput(value) {
  if (!value) return NaN

  // Eliminar espacios
  value = value.replace(/\s/g, "")

  const hasComma = value.includes(",")
  const hasDot = value.includes(".")

  if (hasComma && hasDot) {
    // El separador decimal es el último que aparece
    if (value.lastIndexOf(",") > value.lastIndexOf(".")) {
      // Formato europeo: 1.234.567,89
      value = value.replace(/\./g, "").replace(",", ".")
    } else {
      // Formato americano: 1,234,567.89
      value = value.replace(/,/g, "")
    }
  } else if (hasComma) {
    // Solo coma → decimal
    value = value.replace(",", ".")
  }

  return Number(value)
}

export default function ReajusteSaldoModal({
  cuenta,
  onClose,
  onSuccess
}) {
  const [saldoReal, setSaldoReal] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()

    const saldoNumerico = parseDecimalInput(saldoReal)

    if (!Number.isFinite(saldoNumerico)) {
      alert("Ingrese un valor numérico válido")
      return
    }

    try {
      setLoading(true)

      await reajustarSaldo({
        cuenta_id: cuenta.id,
        saldo_real: saldoNumerico,
        descripcion: "Reajuste de saldo"
      })

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error al reajustar saldo:", error)
      alert("Ocurrió un error al reajustar el saldo")
    } finally {
      setLoading(false)
    }
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
          <p>
            <strong>Cuenta:</strong> {cuenta.nombre}
          </p>
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
          pattern="[0-9.,\s]+"
          className="input w-full"
          placeholder="Ej: 1.500.000,50 o 1500000.50"
          value={saldoReal}
          onChange={(e) =>
            setSaldoReal(
              e.target.value.replace(/[^0-9.,\s]/g, "")
            )
          }
          required
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Reajustando..." : "Reajustar"}
          </button>
        </div>
      </form>
    </div>
  )
}
