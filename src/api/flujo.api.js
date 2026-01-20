import api from "./axios"
import { apiUrl } from "./apiUrl"

export async function getFlujos(params = {}) {
  const { data } = await api.get(apiUrl("flujo/"), { params })
  return data
}

export async function createFlujo(data) {
  const { data: response } = await api.post(apiUrl("flujo/"), data)
  return response
}

export async function updateFlujo(id, data) {
  const { data: response } = await api.put(
    apiUrl(`flujo/${id}/`),
    data
  )
  return response
}

export async function deleteFlujo(id) {
  const { data: response } = await api.delete(
    apiUrl(`flujo/${id}/`)
  )
  return response
}
