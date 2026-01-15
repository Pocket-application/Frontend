import { useState } from "react";
import { updateNombre } from "../../api/user.api";
import Modal from "./Modal";

export default function UpdateNombreModal({ user, onClose, onUpdated }) {
  const [nombre, setNombre] = useState(user.nombre);
  const [apellido, setApellido] = useState(user.apellido);

  const guardar = async () => {
    await updateNombre({ nombre, apellido });
    onUpdated();
    onClose();
  };

  return (
    <Modal title="Actualizar nombre" onClose={onClose}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="input"
      />
      <input
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Apellido"
        className="input"
      />
      <button onClick={guardar} className="btn-primary">
        Guardar cambios
      </button>
    </Modal>
  );
}
