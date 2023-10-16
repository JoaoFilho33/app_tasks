import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
}

interface AuthContextProps {
  user: User | null;
  signin: (user: User) => void;
  signout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Tente recuperar o usuário do localStorage ao carregar a aplicação
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signin = (newUser: User) => {
    setUser(newUser);
    // Salve o usuário no localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const signout = () => {
    setUser(null);
    // Remova o usuário do localStorage ao fazer logout
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, signin, signout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
