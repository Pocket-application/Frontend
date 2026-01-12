import { Link } from 'react-router-dom'

export default function Documentation() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <header className="mb-16">
        <Link
          to="/"
          className="text-sm text-emerald-400 hover:underline"
        >
          ← Volver a la landing
        </Link>

        <h1 className="mt-6 text-4xl font-bold text-white">
          Documentación · Pocket App
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          API REST para la gestión de finanzas personales, diseñada con
          arquitectura modular, seguridad JWT y cálculos de saldos optimizados
          a nivel de base de datos.
        </p>
      </header>

      {/* Sections */}
      

      <DocSection title="🔐 Autenticación">
        <p>
          La API utiliza autenticación basada en JWT con tokens de acceso y
          refresco.
        </p>

        <h4 className="mt-4 font-semibold text-white">
          Login
        </h4>
        <CodeBlock>
{`POST /auth/login

{
  "email": "usuario@email.com",
  "password": "********"
}`}
        </CodeBlock>
      </DocSection>

      <DocSection title="👤 Usuarios">
        <Endpoint
          method="POST"
          path="/usuarios"
          description="Registrar usuario"
        />
        <Endpoint
          method="PUT"
          path="/usuarios/nombre"
          description="Actualizar nombre"
        />
        <Endpoint
          method="PUT"
          path="/usuarios/correo"
          description="Actualizar correo"
        />
        <Endpoint
          method="PUT"
          path="/usuarios/telefono"
          description="Actualizar teléfono"
        />
        <Endpoint
          method="PUT"
          path="/usuarios/password"
          description="Actualizar contraseña"
        />
      </DocSection>

      <DocSection title="🏦 Cuentas">
        <Endpoint method="POST" path="/cuentas" description="Crear cuenta" />
        <Endpoint method="GET" path="/cuentas" description="Listar cuentas" />
        <Endpoint
          method="PUT"
          path="/cuentas/{cuenta_id}"
          description="Actualizar cuenta"
        />
        <Endpoint
          method="DELETE"
          path="/cuentas/{cuenta_id}"
          description="Eliminar cuenta"
        />
      </DocSection>

      <DocSection title="📊 Flujos (Ingresos / Egresos)">
        <p>
          Los movimientos representan ingresos y egresos reales.
        </p>
        <ul className="mt-3 list-disc list-inside text-slate-300">
          <li>Ingreso → tipo_egreso = NULL</li>
          <li>Egreso → Fijo | Variable</li>
          <li>Validaciones a nivel BD y backend</li>
        </ul>

        <Endpoint method="POST" path="/flujo" description="Crear movimiento" />
        <Endpoint method="GET" path="/flujo" description="Listar movimientos" />
      </DocSection>

      <DocSection title="🔁 Transferencias">
        <p>
          Una transferencia genera automáticamente:
        </p>
        <ul className="mt-3 list-disc list-inside text-slate-300">
          <li>🔴 Egreso (cuenta origen)</li>
          <li>🟢 Ingreso (cuenta destino)</li>
        </ul>

        <Endpoint
          method="POST"
          path="/transferencias"
          description="Crear transferencia"
        />
        <Endpoint
          method="GET"
          path="/transferencias"
          description="Listar transferencias"
        />
      </DocSection>

      <DocSection title="💹 Saldos">
        <Endpoint
          method="GET"
          path="/saldos/cuentas"
          description="Saldo por cuenta"
        />
        <Endpoint
          method="GET"
          path="/saldos/rango"
          description="Saldo por rango de fechas"
        />
        <Endpoint
          method="POST"
          path="/saldos/reajuste"
          description="Reajuste de saldo"
        />
      </DocSection>
    </div>
  )
}

/* ---------- Componentes ---------- */

function DocSection({ title, children }) {
  return (
    <section className="mb-14">
      <h2 className="mb-4 text-2xl font-bold text-emerald-400">
        {title}
      </h2>
      <div className="space-y-4 text-slate-300">
        {children}
      </div>
    </section>
  )
}

function Endpoint({ method, path, description }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4 border border-slate-800">
      <div>
        <span className="mr-3 rounded-md bg-emerald-500 px-2 py-1 text-sm font-bold text-slate-950">
          {method}
        </span>
        <code className="text-slate-200">{path}</code>
      </div>
      <span className="text-slate-400">{description}</span>
    </div>
  )
}

function CodeBlock({ children }) {
  return (
    <pre className="rounded-xl bg-slate-900 p-4 text-sm text-slate-200 overflow-x-auto border border-slate-800">
      <code>{children}</code>
    </pre>
  )
}
