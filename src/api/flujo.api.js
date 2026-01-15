import api from "./axios"

export async function getFlujos(params = {}) {
  const { data } = await api.get("/flujo/", { params })
  return data
}

export async function createFlujo(data) {
  const { data: response } = await api.post("/flujo/", data)
  return response
}

export async function updateFlujo(id, data) {
  const { data: response } = await api.put(`/flujo/${id}/`, data)
  return response
}

export async function deleteFlujo(id) {
  const { data: response } = await api.delete(`/flujo/${id}/`)
  return response
}