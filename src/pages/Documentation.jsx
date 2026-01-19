import { Link } from 'react-router-dom'

export default function Documentation() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <header className="mb-20">
        <Link
          to="/"
          className="text-sm text-emerald-400 hover:underline"
        >
          ← Volver a la landing
        </Link>

        <h1 className="mt-6 text-4xl font-bold text-white">
          Cómo Pocket Application te ayuda a manejar tus finanzas
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Pocket Application es una plataforma diseñada para darte claridad, control y consciencia sobre tu dinero. No se trata solo de registrar gastos, sino de entender cómo te mueves financieramente y por qué.
        </p>
      </header>

      <Section title="La idea detrás de la plataforma">
        <p>
          Muchas personas sienten que el dinero simplemente “se va”, sin tener claridad de en qué, cuándo o por qué.
        </p>
        <p>
          Pocket Application nace para resolver eso: transformar tus movimientos financieros en información clara, ordenada y útil para tomar mejores decisiones.
        </p>
      </Section>

      <Section title="Qué puedes hacer con Pocket Application">
        <Feature
          title="Centralizar tu dinero"
          description="Registra todas tus cuentas en un solo lugar y observa tu situación financiera completa."
        />
        <Feature
          title="Entender tus hábitos financieros"
          description="Identifica patrones de gasto, ingresos recurrentes y egresos."
        />
        <Feature
          title="Separar lo necesario de lo impulsivo"
          description="Diferencia claramente entre gastos fijos y variables."
        />
        <Feature
          title="Mover dinero sin perder contexto"
          description="Las transferencias entre cuentas no distorsionan tu realidad financiera."
        />
        <Feature
          title="Conocer tu saldo real"
          description="Tus saldos se calculan a partir de movimientos reales."
        />
      </Section>

      <Section title="Control sin complicaciones">
        <p>
          Pocket Application está diseñada para que el control financiero no se sienta como una carga.
        </p>
        <p>
          Tú te concentras en decidir, la plataforma se encarga de mantener la coherencia de los datos.
        </p>
      </Section>

      <Section title="¿Para quién es esta plataforma?">
        <ul className="list-disc list-inside space-y-2">
          <li>Personas que quieren dejar de vivir al día</li>
          <li>Usuarios que desean entender en qué se va su dinero</li>
          <li>Quienes buscan disciplina financiera sin complejidad</li>
          <li>Personas que quieren tomar decisiones basadas en datos reales</li>
        </ul>
      </Section>

      <Section title="Qué puedes esperar con el tiempo">
        <p>
          Con el uso constante empezarás a notar patrones claros y oportunidades de ahorro.
        </p>
        <p>
          Pocket Application no promete soluciones mágicas. Promete claridad.
        </p>
      </Section>

      {/* CTA FINAL */}
      <section className="mt-24 rounded-2xl bg-slate-900 p-12 text-center border border-slate-800">
        <h2 className="text-3xl font-bold text-white">
          Tus finanzas, bajo control
        </h2>

        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Entiende tu dinero hoy y construye tranquilidad financiera mañana.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Web */}
          <Link
            to="/login"
            className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Empezar ahora
          </Link>

          {/* Android APK */}
          <a
            href="/pocket-app.apk"
            download
            className="rounded-xl border border-emerald-400 px-8 py-4 font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-slate-950 transition"
          >
            Descargar app (Android)
          </a>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Requiere Android · Instalación manual (APK)
        </p>
      </section>
    </div>
  )
}

/* ---------- Componentes ---------- */

function Section({ title, children }) {
  return (
    <section className="mb-16 max-w-4xl">
      <h2 className="mb-6 text-2xl font-bold text-emerald-400">
        {title}
      </h2>
      <div className="space-y-4 text-slate-300 text-lg">
        {children}
      </div>
    </section>
  )
}

function Feature({ title, description }) {
  return (
    <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 text-slate-300">
        {description}
      </p>
    </div>
  )
}
