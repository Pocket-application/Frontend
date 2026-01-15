import { useState } from "react";
import { Link } from "react-router-dom";
import { handleLogout } from "../services/logout.service";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const closeMobileMenu = () => setOpen(false);

  return (
    <>
      <nav className="bg-slate-900 border-b border-slate-800 relative z-40">
        <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <Link to="/dashboard" className="text-xl font-bold text-emerald-400">
            Pocket
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/flujos" className="nav-link">Flujos</Link>
            <Link to="/transferencias" className="nav-link">Transferencias</Link>
            <Link to="/categorias" className="nav-link">Categorías</Link>
            <Link to="/cuentas" className="nav-link">Cuentas</Link>
            <Link to="/reportes" className="nav-link">Reportes</Link>

            {/* USER MENU */}
            <div
              className="relative"
              onMouseEnter={() => setMenu(true)}
              onMouseLeave={() => setMenu(false)}
            >
              <button
                type="button"
                className="cursor-pointer font-medium text-slate-200 hover:text-emerald-400 transition focus:outline-none"
                onFocus={() => setMenu(true)}
                onBlur={() => setMenu(false)}
                aria-haspopup="menu"
                aria-expanded={menu}
              >
                Hola {user?.nombre}
              </button>

              {menu && (
                <div
                  className="absolute right-0 top-full pt-2 z-50"
                  role="menu"
                >
                  <div className="w-44 rounded-xl bg-slate-800 border border-slate-700 shadow-lg overflow-hidden">
                    <Link
                      to="/perfil"
                      role="menuitem"
                      className="block px-4 py-2 text-sm hover:bg-slate-700 transition"
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      role="menuitem"
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
            onClick={() => setOpen(true)}
            className="md:hidden text-slate-200 text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ================= MOBILE FULLSCREEN MENU ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-slate-900 md:hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-slate-800">
            <span className="text-lg font-semibold text-emerald-400">
              Hola {user?.nombre}
            </span>
            <button
              onClick={closeMobileMenu}
              className="text-2xl text-slate-200"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col px-6 py-8 gap-6 text-lg">
            <Link to="/dashboard" onClick={closeMobileMenu} className="nav-link">
              Dashboard
            </Link>
            <Link to="/flujos" onClick={closeMobileMenu} className="nav-link">
              Flujos
            </Link>
            <Link to="/transferencias" onClick={closeMobileMenu} className="nav-link">
              Transferencias
            </Link>
            <Link to="/categorias" onClick={closeMobileMenu} className="nav-link">
              Categorías
            </Link>
            <Link to="/perfil" onClick={closeMobileMenu} className="nav-link">
              Perfil
            </Link>

            <button
              onClick={() => {
                closeMobileMenu();
                handleLogout();
              }}
              className="mt-8 text-left text-red-400 font-medium"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </>
  );
}
