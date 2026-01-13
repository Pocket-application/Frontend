import { useState } from "react";
import { Link } from "react-router-dom";
import { handleLogout } from "../services/logout.service";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold text-emerald-400">
          Pocket
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/flujos" className="nav-link">Flujos</Link>
          <Link to="/transferencias" className="nav-link">Transferencias</Link>
          <Link to="/categorias" className="nav-link">Categorías</Link>

          {/* USER MENU */}
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <span className="cursor-pointer font-medium text-slate-200 hover:text-emerald-400 transition">
              Hola {user?.nombre}
            </span>

            {menu && (
              <div className="absolute right-0 top-full pt-2 z-50">
                <div className="w-44 rounded-xl bg-slate-800 border border-slate-700 shadow-lg overflow-hidden">
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-sm hover:bg-slate-700 transition"
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-200 text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2 border-t border-slate-800">
          <Link className="block nav-link" to="/flujos">Flujos</Link>
          <Link className="block nav-link" to="/transferencias">Transferencias</Link>
          <Link className="block nav-link" to="/categorias">Categorías</Link>
          <Link className="block nav-link" to="/perfil">Perfil</Link>
          <button onClick={handleLogout} className="block text-red-400 pt-2">
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}
