// src/services/token.service.js

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

/* ===============================
   GETTERS
================================ */
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

/* ===============================
   SETTERS
================================ */
export function setTokens({ access_token, refresh_token }) {
  localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
}

/* ===============================
   CLEAR SESSION
================================ */
export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

/* ===============================
   LOGOUT (frontend)
================================ */
export function logout() {
  clearTokens()
}
