export function useGreeting(nombre = "Usuario") {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) return `Buenos días, ${nombre} 👋🏽`
  if (hour >= 12 && hour < 19) return `Buenas tardes, ${nombre} 👋🏽`
  return `Buenas noches, ${nombre} 👋🏽`
}
