import axios from 'axios'
import { getAccessToken, logout } from '../services/token.service'

const api = axios.create({
  baseURL: 'http://72.61.0.102:8001',
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Interceptor REQUEST
 * Adjunta el access_token automáticamente
 */
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Interceptor RESPONSE
 * Manejo global de errores (401, 403)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout()
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default api
