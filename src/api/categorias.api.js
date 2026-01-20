// src/api/categorias.api.js
import api from "./axios"

/**
 * GET /categorias/
 */
export const getCategorias = async () => {
  const { data } = await api.get("/categorias/")
  return data
}

/**
 * POST /categorias/
 */
export const createCategoria = async (payload) => {
  const { data } = await api.post("/categorias/", payload)
  return data
}

/**
 * PUT /categorias/{id}/
 */
export const updateCategoria = async (id, payload) => {
  const { data } = await api.put(`/categorias/${id}`, payload)
  return data
}

/**
 * DELETE /categorias/{id}/
 */
export const deleteCategoria = async (id) => {
  const { data } = await api.delete(`/categorias/${id}`)
  return data
}
