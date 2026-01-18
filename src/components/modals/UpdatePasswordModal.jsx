import { useState } from "react";
import { updatePassword } from "../../api/user.api";
import Modal from "./Modal";

export default function UpdatePasswordModal({ onClose }) {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [showActual, setShowActual] = useState(false)
  const [showNueva, setShowNueva] = useState(false)

  const guardar = async () => {
    await updatePassword({
      password_actual: actual,
      password_nueva: nueva,
    });
    onClose();
  };

  return (
    <Modal title="Cambiar contraseña" onClose={onClose}>
      <div className="relative">
        <input
          type={showActual ? "text" : "password"}
          placeholder="Contraseña actual"
          value={actual}
          onChange={(e) => setActual(e.target.value)}
          className="input pr-12"
        />

        <button
          type="button"
          onClick={() => setShowActual(!showActual)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          aria-label={showActual ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showActual ? (
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
          type={showNueva ? "text" : "password"}
          placeholder="Nueva contraseña"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          className="input pr-12"
        />

        <button
          type="button"
          onClick={() => setShowNueva(!showNueva)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          aria-label={showNueva ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showNueva ? (
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

      <button onClick={guardar} className="btn-danger">
        Cambiar contraseña
      </button>
    </Modal>
  );
}
