import api from "./axios"

export async function getCategorias() {
  const { data } = await api.get("/categorias/")
  return data
}
export async function createCategoria(data) {
  const { data: response } = await api.post("/categorias/", data)
  return response
}
export async function updateCategoria(id, data) {
  const { data: response } = await api.put(`/categorias/${id}/`, data)
  return response
}

export async function deleteCategoria(id) {
  const { data: response } = await api.delete(`/categorias/${id}/`)
  return response
}