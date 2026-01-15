import api from "./axios"

export const getSaldosPorCuenta = async () => {
  const { data } = await api.get("/saldos/cuentas")
  return data
}

export const getFlujos = async (params = {}) => {
  const { data } = await api.get("/flujo/", { params })
  return data
}
