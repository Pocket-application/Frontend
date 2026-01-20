// src/api/cuentas.api.js
import api from "./axios"

/**
 * GET /cuentas/
 */
export const getCuentas = async () => {
  const { data } = await api.get("/cuentas/")
  return data
}

/**
 * POST /cuentas/
 */
export const createCuenta = async (payload) => {
  const { data } = await api.post("/cuentas/", payload)
  return data
}

/**
 * PUT /cuentas/{id}/
 */
export const updateCuenta = async (id, payload) => {
  const { data } = await api.put(`/cuentas/${id}/`, payload)
  return data
}

/**
 * DELETE /cuentas/{id}/
 */
export const deleteCuenta = async (id) => {
  const { data } = await api.delete(`/cuentas/${id}/`)
  return data
}
