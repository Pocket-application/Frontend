// src/api/user.api.js
import api from "./axios";

/**
 * GET /usuarios/me
 */
export const getMe = async () => {
  const { data } = await api.get("/usuarios/me");
  return data;
};

/**
 * PUT /usuarios/nombre
 */
export const updateNombre = async ({ nombre, apellido }) => {
  const { data } = await api.put("/usuarios/nombre", {
    nombre,
    apellido,
  });
  return data;
};

/**
 * PUT /usuarios/correo
 */
export const updateCorreo = async ({ correo }) => {
  const { data } = await api.put("/usuarios/correo", { correo });
  return data;
};

/**
 * PUT /usuarios/telefono
 */
export const updateTelefono = async ({ telefono }) => {
  const { data } = await api.put("/usuarios/telefono", { telefono });
  return data;
};

/**
 * PUT /usuarios/password
 */
export const updatePassword = async ({
  password_actual,
  password_nueva,
}) => {
  const { data } = await api.put("/usuarios/password", {
    password_actual,
    password_nueva,
  });
  return data;
};
