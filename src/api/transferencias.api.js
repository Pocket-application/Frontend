import api from "./axios"

export async function getTransferencias(params = {}) {
  const { data } = await api.get("/transferencias/", { params })
  return data
}

export async function getTransferencia(id) {
  const { data } = await api.get(`/transferencias/${id}/`)
  return data
}

export async function createTransferencia(data) {
  const { data: response } = await api.post("/transferencias/", data)
  return response
}

export async function updateTransferencia(id, data) {
    const { data: response } = await api.put(`/transferencias/${id}/`, data)
    return response
}

export async function deleteTransferencia(id) {
    const { data: response } = await api.delete(`/transferencias/${id}/`)
    return response
}