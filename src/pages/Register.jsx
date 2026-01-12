import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth.api'

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.email,
      telefono: form.telefono,
      password: form.password
    }

    try {
      setLoading(true)
      await register(payload)
      navigate('/login')
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Error al crear la cuenta. Intenta nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 p-8 border border-slate-800">
        <Link to="/" className="text-sm text-emerald-400 hover:underline">
          ← Volver al inicio
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Crear cuenta
        </h1>

        {error && (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            className="input"
          />

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
            name="telefono"
            placeholder="Número de teléfono"
            value={form.telefono}
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

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="input"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400 transition disabled:opacity-50"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400 text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
