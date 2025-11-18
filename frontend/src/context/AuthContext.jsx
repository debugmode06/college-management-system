import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Persist login: on reload, keeps session
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  function login(role, email) {
    const loggedInUser = { role, email };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
