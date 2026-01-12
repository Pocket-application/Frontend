import { useState } from 'react'
import { login } from '../api/auth.api'
import { setTokens } from '../services/token.service'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const data = await login({ email, password })
      setTokens(data)
      alert('Login exitoso')
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-slate-900 p-8"
      >
        <h1 className="mb-6 text-2xl font-bold text-white">
          Iniciar sesión
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-400">{error}</p>
        )}

        <input
          type="email"
          placeholder="Correo"
          className="mb-4 w-full rounded-lg bg-slate-800 p-3 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="mb-6 w-full rounded-lg bg-slate-800 p-3 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
