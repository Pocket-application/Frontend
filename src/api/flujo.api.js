// src/api/flujo.api.js
import api from "./axios"

/**
 * GET flujo/
 */
export const getFlujos = async (params = {}) => {
  const { data } = await api.get("/flujo/", { params })
  return data
}

/**
 * POST flujo/
 */
export const createFlujo = async (payload) => {
  const { data } = await api.post("/flujo/", payload)
  return data
}

/**
 * PUT flujo/{id}/
 */
export const updateFlujo = async (id, payload) => {
  const { data } = await api.put(`/flujo/${id}`, payload
  )
  return data
}

/**
 * DELETE flujo/{id}/
 */
export const deleteFlujo = async (id) => {
  const { data } = await api.delete(`/flujo/${id}`)
  return data
}
