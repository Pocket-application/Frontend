import api from "./axios";

export const getMe = async () => {
  const { data } = await api.get("/usuarios/me");
  return data;
};