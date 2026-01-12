import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Documentation from './pages/Documentation'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Flujos from './pages/Flujos'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './routes/PrivateRoute'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/flujos" element={
            <PrivateRoute>
              <Flujos />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  )
}
