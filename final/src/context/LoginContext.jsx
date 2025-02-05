import React, { createContext, useState, useContext, useEffect } from "react";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userInfo, setUserInfo] = useState(() => {
    return JSON.parse(localStorage.getItem("userInfo")) || null;
  });

  const login = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
