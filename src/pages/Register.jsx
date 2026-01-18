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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              className="input pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                // 👁️ abierto
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5
                      c4.478 0 8.268 2.943 9.542 7
                      -1.274 4.057-5.064 7-9.542 7
                      -4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // 👁️ cerrado
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3l18 18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10.584 10.587a3 3 0 004.243 4.243" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6.223 6.223A9.956 9.956 0 0112 5
                      c4.478 0 8.268 2.943 9.543 7
                      a9.964 9.964 0 01-4.132 5.411" />
                </svg>
              )}
            </button>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="input pr-12"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showConfirmPassword ? (
                // 👁️ abierto
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5
                      c4.478 0 8.268 2.943 9.542 7
                      -1.274 4.057-5.064 7-9.542 7
                      -4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // 👁️ cerrado
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3l18 18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10.584 10.587a3 3 0 004.243 4.243" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6.223 6.223A9.956 9.956 0 0112 5
                      c4.478 0 8.268 2.943 9.543 7
                      a9.964 9.964 0 01-4.132 5.411" />
                </svg>
              )}
            </button>
          </div>


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
