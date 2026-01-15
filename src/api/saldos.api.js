import api from "./axios"

export async function getSaldosPorCuenta() {
  const { data } = await api.get("/saldos/cuentas")
  return data
}
