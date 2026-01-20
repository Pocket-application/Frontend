// src/api/apiUrl.js

/**
 * Base URL de la API
 * Ejemplo:
 * https://oscarpalomino.dev/pocket/api
 */
const RAW_API_URL = "https://www.oscarpalomino.dev/pocket/api/"

if (!RAW_API_URL) {
  throw new Error(
    '[API CONFIG ERROR] VITE_API_URL no está definido'
  )
}

/**
 * Normaliza la URL base eliminando el slash final
 */
const API_URL = RAW_API_URL.replace(/\/+$/, '')

/**
 * Construye URLs de API seguras y consistentes
 * @param {string} path - Ej: "flujo/", "flujo/12/"
 */
export function apiUrl(path = '') {
  // Si no hay path, devolver la base
  if (!path) return API_URL

  // Si ya es absoluta y pertenece a la API → no tocar
  if (path.startsWith(API_URL)) {
    return path
  }

  // Si es absoluta pero externa → warning y devolver tal cual
  if (/^https?:\/\//.test(path)) {
    console.warn('[API URL WARNING] URL externa detectada:', path)
    return path
  }

  // Limpiar slashes iniciales del path
  const cleanPath = path.replace(/^\/+/, '')

  return `${API_URL}/${cleanPath}`
}

export default API_URL
