export function getCached(key) {
  const raw = localStorage.getItem(key)
  if (!raw) return null

  const { data, exp } = JSON.parse(raw)
  if (Date.now() > exp) return null

  return data
}

export function setCached(key, data, ttl = 300000) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      exp: Date.now() + ttl
    })
  )
}

export function clearCached(key) {
  localStorage.removeItem(key)
}
