import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      authApi
        .getMe()
        .then((data) => setUser(data.user))
        .catch(() => localStorage.removeItem("access_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem("access_token", data.access_token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (formData) => {
    const registerFn = formData.role === "manager"
      ? authApi.registerManager
      : authApi.registerCandidate;
    const data = await registerFn(formData);
    localStorage.setItem("access_token", data.access_token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem("access_token");
    setUser(null);
  }, []);

  const isManager = user?.role === "manager";
  const isCandidate = user?.role === "candidate";

  const value = { user, loading, login, register, logout, isManager, isCandidate };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
