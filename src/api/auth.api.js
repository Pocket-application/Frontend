import api from './axios'

export async function login(credentials) {
  const response = await api.post('/auth/login', credentials)
  return response.data
}
