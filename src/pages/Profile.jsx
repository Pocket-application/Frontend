import { useEffect, useState } from "react";
import { getMe } from "../api/user.api";
import Navbar from '../components/Navbar'
import UpdateNombreModal from "../components/modals/UpdateNombreModal";
import UpdateCorreoModal from "../components/modals/UpdateCorreoModal";
import UpdateTelefonoModal from "../components/modals/UpdateTelefonoModal";
import UpdatePasswordModal from "../components/modals/UpdatePasswordModal";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [modalNombre, setModalNombre] = useState(false);
  const [modalCorreo, setModalCorreo] = useState(false);
  const [modalTelefono, setModalTelefono] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  const loadUser = async () => {
    const data = await getMe();
    setUser(data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) return <p className="p-6">Cargando...</p>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar user={{ nombre: 'Usuario' }} />

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-emerald-400">
          Mi perfil
        </h1>

        {/* CTA APP ANDROID — SOLO MÓVIL */}
        <div className="block sm:hidden">
          <a
            href="/pocket-app.apk"
            download
            className="
              flex items-center justify-center gap-2
              w-full rounded-xl
              bg-emerald-500
              py-3 font-semibold
              text-slate-950
              hover:bg-emerald-400
              transition
            "
          >
            📱 Descargar app (Android)
          </a>

          <p className="mt-2 text-center text-xs text-slate-400">
            Instalación manual · APK
          </p>
        </div>

        <ProfileRow
          label="Nombre completo"
          value={`${user.nombre} ${user.apellido}`}
          onEdit={() => setModalNombre(true)}
        />

        <ProfileRow
          label="Correo electrónico"
          value={user.correo}
          onEdit={() => setModalCorreo(true)}
        />

        <ProfileRow
          label="Teléfono"
          value={user.telefono || "No registrado"}
          onEdit={() => setModalTelefono(true)}
        />

        <ProfileRow
          label="Contraseña"
          value="••••••••"
          onEdit={() => setModalPassword(true)}
        />
      </main>

      {/* MODALS */}
      {modalNombre && (
        <UpdateNombreModal
          user={user}
          onClose={() => setModalNombre(false)}
          onUpdated={loadUser}
        />
      )}

      {modalCorreo && (
        <UpdateCorreoModal
          correo={user.correo}
          onClose={() => setModalCorreo(false)}
          onUpdated={loadUser}
        />
      )}

      {modalTelefono && (
        <UpdateTelefonoModal
          telefono={user.telefono}
          onClose={() => setModalTelefono(false)}
          onUpdated={loadUser}
        />
      )}

      {modalPassword && (
        <UpdatePasswordModal
          onClose={() => setModalPassword(false)}
        />
      )}
    </div>
  );
}

/* ---------- Subcomponente ---------- */

function ProfileRow({ label, value, onEdit }) {
  return (
    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-slate-200 font-medium">{value}</p>
      </div>

      <button
        onClick={onEdit}
        className="text-emerald-400 hover:underline text-sm"
      >
        Actualizar
      </button>
    </div>
  );
}
