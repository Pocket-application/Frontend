const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '')

export function apiUrl(path) {
  if (!path) return API_URL

  // Si ya es absoluta y contiene la API, no tocarla
  if (path.startsWith(API_URL)) {
    return path
  }

  // Si es una URL absoluta pero NO es la API → error
  if (path.startsWith('http')) {
    console.warn('[API URL WARNING]', path)
    return path
  }

  // Normalizar slashes
  const cleanPath = path.replace(/^\/+/, '')

  return `${API_URL}/${cleanPath}`
}
