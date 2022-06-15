import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { fakeAuth } from "../../utils/fakeAuth";

export const demoTwoContext = React.createContext()
const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const navigate = useNavigate() // 跳转

  const handleLogin = useCallback(async () => {
    const token = await fakeAuth();
    setToken(token);
    navigate('/dashboard');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <demoTwoContext.Provider value={value}>{children}</demoTwoContext.Provider>;
};

export default AuthProvider;
