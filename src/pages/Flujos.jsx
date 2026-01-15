import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getFlujos } from "../api/flujo.api";

export default function Flujos() {
  const [flujos, setFlujos] = useState([]);

  useEffect(() => {
    getFlujos().then(setFlujos);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar user={{ nombre: "Usuario" }} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Movimientos</h1>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Descripción</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Monto</th>
                <th className="px-4 py-3">Cuenta</th>
              </tr>
            </thead>
            <tbody>
              {flujos.map((f) => (
                <tr key={f.id} className="border-t border-slate-800">
                  <td className="px-4 py-3">{f.fecha}</td>
                  <td className="px-4 py-3">{f.descripcion}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      f.tipo_movimiento === "Ingreso"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {f.tipo_movimiento}
                  </td>
                  <td className="px-4 py-3">
                    ${Number(f.monto).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{f.cuenta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
