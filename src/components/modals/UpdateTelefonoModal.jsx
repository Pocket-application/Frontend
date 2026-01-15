import { useState } from "react";
import { updateTelefono } from "../../api/user.api";
import Modal from "./Modal";

export default function UpdateTelefonoModal({ telefono, onClose, onUpdated }) {
  const [value, setValue] = useState(telefono || "");

  const guardar = async () => {
    await updateTelefono({ telefono: value });
    onUpdated();
    onClose();
  };

  return (
    <Modal title="Actualizar teléfono" onClose={onClose}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input"
      />
      <button onClick={guardar} className="btn-primary">
        Guardar cambios
      </button>
    </Modal>
  );
}
