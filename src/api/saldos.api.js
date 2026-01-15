import api from "./axios"

export async function getSaldosPorCuenta() {
  const { data } = await api.get("/saldos/cuentas")
  return data
}

export async function reajustarSaldo(data) {
  const { data: response } = await api.post("/saldos/reajuste", data)
  return response
}