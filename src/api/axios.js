// src/api/axios.js
import axios from 'axios'
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  logout
} from '../services/token.service'
import { refreshToken as refreshTokenApi } from './auth.api'

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '')

function normalizeApiUrl(config) {
  if (!config.url) return config

  // Si ya es absoluta y correcta → no tocar
  if (config.url.startsWith(API_URL)) {
    return config
  }

  // Si es absoluta pero NO es la API → warning
  if (config.url.startsWith('http')) {
    console.warn('[Axios] URL externa detectada:', config.url)
    return config
  }

  // Reconstruir SIEMPRE con API_URL
  const cleanPath = config.url.replace(/^\/+/, '')
  config.url = `${API_URL}/${cleanPath}`

  return config
}



const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/* ===============================
   REQUEST INTERCEPTOR
================================ */
api.interceptors.request.use(
  (config) => {
    normalizeApiUrl(config)

    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)


/* ===============================
   RESPONSE INTERCEPTOR
================================ */
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(api(originalRequest))
            },
            reject
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refresh_token = getRefreshToken()
        if (!refresh_token) throw error

        const data = await refreshTokenApi(refresh_token)

        setTokens(data)

        api.defaults.headers.Authorization =
          `Bearer ${data.access_token}`

        processQueue(null, data.access_token)

        originalRequest.headers.Authorization =
          `Bearer ${data.access_token}`

        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        logout()
        globalThis.location.href = '/'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
