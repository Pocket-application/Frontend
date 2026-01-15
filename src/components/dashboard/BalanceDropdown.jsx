import { useState } from "react"

export default function BalanceDropdown({ saldos }) {
  const total = saldos.reduce((a, s) => a + Number(s.saldo), 0)
  const [selected, setSelected] = useState("general")

  const current =
    selected === "general"
      ? total
      : Number(saldos.find(s => s.cuenta_id === Number(selected))?.saldo || 0)

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <select
        className="bg-slate-800 rounded-lg px-3 py-2 mb-3"
        onChange={e => setSelected(e.target.value)}
      >
        <option value="general">Balance general</option>
        {saldos.map(s => (
          <option key={s.cuenta_id} value={s.cuenta_id}>
            {s.cuenta}
          </option>
        ))}
      </select>

      <p className="text-4xl font-bold text-emerald-400">
        ${current.toLocaleString()}
      </p>
    </div>
  )
}
