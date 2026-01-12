import api from './axios'


export const getCuentas = async () => {
const { data } = await api.get('/cuentas/')
return data
}


export const getSaldosPorCuenta = async () => {
const { data } = await api.get('/saldos/cuentas')
return data
}