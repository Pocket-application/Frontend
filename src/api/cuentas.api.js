import api from "./axios"

export async function getCuentas() {
  const { data } = await api.get("/cuentas/")
  return data
}
export async function createCuenta(data) {
  const { data: response } = await api.post("/cuentas/", data)
  return response
}

export async function updateCuenta(id, data) {
  const { data: response } = await api.put(`/cuentas/${id}/`, data)
  return response
}

export async function deleteCuenta(id) {
  const { data: response } = await api.delete(`/cuentas/${id}/`)
  return response
}