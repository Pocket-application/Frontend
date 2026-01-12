import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth.api'
import { setTokens } from '../services/token.service'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!form.email || !form.password) {
      setError('Todos los campos son obligatorios')
      return
    }

    try {
      setLoading(true)

      const data = await login({
        correo: form.email,   // ⚠ nombre correcto según el backend
        password: form.password
      })

      // Guarda tokens
      setTokens(data)

      // Decodifica el token para actualizar el AuthContext
      const payload = JSON.parse(atob(data.access_token.split('.')[1]))
      setUser({ id: payload.sub, rol: payload.rol })

      // Redirige al dashboard
      navigate('/dashboard')

    } catch (err) {
      // Manejo seguro de errores de FastAPI
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          setError(err.response.data.detail.map(d => d.msg).join(', '))
        } else if (typeof err.response.data.detail === 'string') {
          setError(err.response.data.detail)
        } else {
          setError('Error desconocido')
        }
      } else {
        setError('Credenciales inválidas')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 border border-slate-800">
        <Link to="/" className="text-sm text-emerald-400 hover:underline">
          ← Volver al inicio
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Iniciar sesión
        </h1>

        {error && (
          <p className="mt-4 text-sm text-red-400 break-words">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="input"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400 transition disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400 text-center">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-emerald-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
