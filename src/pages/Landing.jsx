import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
            Controla tu dinero,
            <span className="block text-emerald-400">domina tus finanzas</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Pocket App es una plataforma para la gestión de finanzas
            personales. Administra cuentas, ingresos, egresos, transferencias
            y consulta saldos en tiempo real de forma segura.
          </p>

          <div className="mt-10 flex gap-4">
            <Link to="/login" className="rounded-xl bg-emerald-500 px-6 py-3 text-slate-950 font-semibold hover:bg-emerald-400 transition">
              Comenzar ahora
            </Link>
            <Link to="/docs" className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-800 transition">
              Ver documentación
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Todo lo que necesitas para tus finanzas personales
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Cuentas y saldos"
            description="Gestiona múltiples cuentas y consulta saldos calculados con funciones SQL optimizadas."
          />
          <Feature
            title="Ingresos y egresos"
            description="Registra flujos financieros con validaciones estrictas y reglas claras."
          />
          <Feature
            title="Transferencias inteligentes"
            description="Una sola acción genera automáticamente el egreso y el ingreso correspondiente."
          />
          <Feature
            title="Categorías personalizadas"
            description="Organiza tus movimientos financieros según tus propias categorías."
          />
          <Feature
            title="Seguridad JWT"
            description="Autenticación con access y refresh tokens para proteger tus datos."
          />
          <Feature
            title="Auditoría completa"
            description="Todas las acciones quedan registradas para mayor control."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Empieza a tomar control hoy
          </h2>
          <p className="mt-4 text-slate-300 mb-10">
            Tus finanzas claras, organizadas y bajo tu control.
          </p>
          <Link to="/register" className="mt-8 rounded-xl bg-emerald-500 px-8 py-4 text-slate-950 font-semibold hover:bg-emerald-400 transition">
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-slate-400">
          © {new Date().getFullYear()} Pocket Application · Finanzas personales
        </div>
      </footer>
    </>
  )
}

function Feature({ title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold text-emerald-400">
        {title}
      </h3>
      <p className="mt-3 text-slate-300">
        {description}
      </p>
    </div>
  )
}
