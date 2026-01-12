import { useState } from "react";
import { Link } from 'react-router-dom'
import { handleLogout } from '../services/logout.service'


export default function Navbar({ user }) {
const [open, setOpen] = useState(false)
const [menu, setMenu] = useState(false)

return (
  <nav className="bg-slate-900 border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
      <Link to="/dashboard" className="text-xl font-bold text-emerald-400">
        Pocket
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link to="/flujos" className="nav-link">
          Flujos
        </Link>
        <Link to="/transferencias" className="nav-link">
          Transferencias
        </Link>
        <Link to="/categorias" className="nav-link">
          Categorías
        </Link>

        <div className="relative">
          <button
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
            className="font-medium"
          >
            {user?.nombre}
          </button>

          {menu && (
            <div
              onMouseEnter={() => setMenu(true)}
              onMouseLeave={() => setMenu(false)}
              className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-800 border border-slate-700"
            >
              <Link to="/perfil" className="block px-4 py-2 hover:bg-slate-700">
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-slate-200"
      >
        ☰
      </button>
    </div>

    {open && (
      <div className="md:hidden px-6 pb-4 space-y-2">
        <Link className="block nav-link" to="/flujos">
          Flujos
        </Link>
        <Link className="block nav-link" to="/transferencias">
          Transferencias
        </Link>
        <Link className="block nav-link" to="/categorias">
          Categorías
        </Link>
        <Link className="block nav-link" to="/perfil">
          Perfil
        </Link>
        <button onClick={handleLogout} className="block text-red-400">
          Cerrar sesión
        </button>
      </div>
    )}
  </nav>
);
}