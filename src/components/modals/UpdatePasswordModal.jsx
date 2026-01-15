import { useState } from "react";
import { updatePassword } from "../../api/user.api";
import Modal from "./Modal";

export default function UpdatePasswordModal({ onClose }) {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");

  const guardar = async () => {
    await updatePassword({
      password_actual: actual,
      password_nueva: nueva,
    });
    onClose();
  };

  return (
    <Modal title="Cambiar contraseña" onClose={onClose}>
      <input
        type="password"
        placeholder="Contraseña actual"
        value={actual}
        onChange={(e) => setActual(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={nueva}
        onChange={(e) => setNueva(e.target.value)}
        className="input"
      />
      <button onClick={guardar} className="btn-danger">
        Cambiar contraseña
      </button>
    </Modal>
  );
}
