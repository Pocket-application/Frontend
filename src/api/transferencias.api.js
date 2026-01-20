// src/api/transferencias.api.js
import api from "./axios"

/**
 * GET /transferencias/
 */
export const getTransferencias = async (params = {}) => {
  const { data } = await api.get("/transferencias/", { params })
  return data
}

/**
 * GET /transferencias/{id}/
 */
export const getTransferencia = async (id) => {
  const { data } = await api.get(`/transferencias/${id}/`)
  return data
}

/**
 * POST /transferencias/
 */
export const createTransferencia = async (payload) => {
  const { data } = await api.post("/transferencias/", payload)
  return data
}

/**
 * PUT /transferencias/{id}/
 */
export const updateTransferencia = async (id, payload) => {
  const { data } = await api.put(`/transferencias/${id}/`, payload)
  return data
}

/**
 * DELETE /transferencias/{id}/
 */
export const deleteTransferencia = async (id) => {
  const { data } = await api.delete(`/transferencias/${id}/`)
  return data
}
