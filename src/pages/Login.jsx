import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth.api'
import { setTokens } from '../services/token.service'
import { useAuth } from '../context/AuthContext'
import { getMe } from '../api/user.api'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

       // 2️⃣ Obtener usuario REAL
      const me = await getMe();

      // 3️⃣ Guardar usuario completo en contexto
      setUser(me);

      // Decodifica el token para actualizar el AuthContext
      // const payload = JSON.parse(atob(data.access_token.split('.')[1]))
      // setUser({ id: payload.sub, rol: payload.rol })

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
                    d="M13.875 18.825A10.05 10.05 0 0112 19
                      c-4.478 0-8.268-2.943-9.543-7
                      a9.956 9.956 0 012.198-3.568" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6.223 6.223A9.956 9.956 0 0112 5
                      c4.478 0 8.268 2.943 9.543 7
                      a9.964 9.964 0 01-4.132 5.411" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>


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
