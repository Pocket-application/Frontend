// src/api/auth.api.js
import api from './axios'

/**
 * LOGIN
 * POST /auth/login
 */
export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

/**
 * REGISTER
 * POST /usuarios/
 */
export async function register(userData) {
  const { data } = await api.post('/usuarios/', userData)
  return data
}

/**
 * REFRESH TOKEN
 * POST /auth/refresh
 */
export async function refreshToken(refresh_token) {
  const { data } = await api.post('/auth/refresh', {
    refresh_token
  })
  return data
}

/**
 * LOGOUT
 * POST /auth/logout
 */
export async function logoutApi(refresh_token) {
  await api.post('/auth/logout', {
    refresh_token
  })
}
