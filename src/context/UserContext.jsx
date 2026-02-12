import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    nombre: "Alejandro Meneses",
    email: "alejandro@correo.com",
    rol: "admin"
  });

  const cambiarRol = () => {
    if (user.rol === "admin") {
      setUser({
        nombre: "Sara Rodriguez",
        email: "est1@gmail.com",
        rol: "student"
      });
    } else {
      setUser({
        nombre: "Alejandro Meneses",
        email: "alejandro@correo.com",
        rol: "admin"
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, cambiarRol }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);