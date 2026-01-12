import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getSaldosPorCuenta } from '../api/dashboard.api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'


export default function Dashboard() {
const [saldos, setSaldos] = useState([])


useEffect(() => {
getSaldosPorCuenta().then(setSaldos)
}, [])


const balance = saldos.reduce((acc, s) => acc + Number(s.saldo), 0)


return (
<div className="min-h-screen bg-slate-950">
<Navbar user={{ nombre: 'Usuario' }} />


<main className="max-w-7xl mx-auto px-6 py-10">
<h1 className="text-3xl font-bold mb-6">Dashboard</h1>


{/* Balance */}
<div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 mb-10">
<p className="text-slate-400">Balance general</p>
<p className="text-4xl font-bold text-emerald-400">${balance.toLocaleString()}</p>
</div>


{/* Chart */}
<div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
<h2 className="text-xl font-semibold mb-4">Saldo por cuenta</h2>
<ResponsiveContainer width="100%" height={300}>
<BarChart data={saldos}>
<XAxis dataKey="cuenta" />
<YAxis />
<Tooltip />
<Bar dataKey="saldo" />
</BarChart>
</ResponsiveContainer>
</div>
</main>
</div>
)
}