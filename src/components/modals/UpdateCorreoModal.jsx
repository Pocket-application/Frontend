import { useState } from "react";
import { updateCorreo } from "../../api/user.api";
import Modal from "./Modal";

export default function UpdateCorreoModal({ correo, onClose, onUpdated }) {
  const [value, setValue] = useState(correo);

  const guardar = async () => {
    await updateCorreo({ correo: value });
    onUpdated();
    onClose();
  };

  return (
    <Modal title="Actualizar correo" onClose={onClose}>
      <input
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input"
      />
      <p className="text-xs text-yellow-400">
        Al cambiar el correo quedarás como no verificado
      </p>
      <button onClick={guardar} className="btn-primary">
        Guardar cambios
      </button>
    </Modal>
  );
}
