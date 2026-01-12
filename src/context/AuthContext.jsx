import { createContext, useState, useEffect } from 'react';
import { 
  getAccessToken, 
  getRefreshToken, 
  setTokens, 
  logout as clearSession 
} from '../services/token.service';
import * as jwt_decode from 'jwt-decode';
import { refreshToken as refreshTokenApi } from '../api/auth.api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  let queue = [];

  // Manejo inicial de token
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const decoded = jwt_decode.default(token);
          setUser({ id: decoded.sub, rol: decoded.rol });
        } catch {
          clearSession();
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // Refresh token automático
  const refreshAccessToken = async () => {
    if (refreshing) {
      return new Promise((resolve, reject) => queue.push({ resolve, reject }));
    }

    setRefreshing(true);
    try {
      const rToken = getRefreshToken();
      if (!rToken) throw new Error('No refresh token');

      const data = await refreshTokenApi(rToken);
      setTokens(data);

      const decoded = jwt_decode.default(data.access_token);
      setUser({ id: decoded.sub, rol: decoded.rol });

      queue.forEach(p => p.resolve(data.access_token));
      queue = [];
      return data.access_token;
    } catch (err) {
      queue.forEach(p => p.reject(err));
      queue = [];
      logout();
      return null;
    } finally {
      setRefreshing(false);
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      logout,
      refreshAccessToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}
