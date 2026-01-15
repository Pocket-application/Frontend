import { logoutApi } from "../api/auth.api";
import { getRefreshToken, logout } from "./token.service";

export async function handleLogout() {
  const refresh = getRefreshToken();
  try {
    if (refresh) await logoutApi(refresh);
  } finally {
    logout();
    globalThis.location.href = "/";
  }
}
