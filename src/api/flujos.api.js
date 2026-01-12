import api from "./axios";

export async function getFlujos() {
  const { data } = await api.get("/flujo/");
  return data;
}
