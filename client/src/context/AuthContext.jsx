import React, { createContext, useState, useContext, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('clothing_token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('clothing_user')); } catch { return null; }
  });

  const login = useCallback((t, u) => {
    localStorage.setItem('clothing_token', t);
    localStorage.setItem('clothing_user', JSON.stringify(u));
    setToken(t);
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('clothing_token');
    localStorage.removeItem('clothing_user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
