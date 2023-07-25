import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: (email, clg, password) => {},
});

export const AuthProvider = (props) => {
  const [isLogged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const set = localStorage.getItem("isLogged");
    if (set === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password, college) => {
    localStorage.setItem("isLogged", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLogged");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLogged,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
