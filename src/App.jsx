import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Documentation from './pages/Documentation'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </div>
  )
}
