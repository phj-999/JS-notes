import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fakeAuth } from "../../utils/fakeAuth";

export const demoTwoContext = React.createContext()
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate() // 跳转
  const location = useLocation() //获取上一页的状态


  const handleLogin = useCallback(async () => {
    const token = await fakeAuth();
    setToken(token);
    setUser({
      id: "1",
      name: "robin",
      permissions: ["analyze"],//用于权限
      roles: ["admin"],//用于权限
    });
    //当登录发生时，我们可以使用上一页将用户重定向到此所需页面。如果此页面从未设置为状态，则默认为“仪表板”页面
    const origin = location.state?.from?.pathname || '/dashboard';
    navigate(origin);
    //navigate('/dashboard');
  }, [location.state?.from?.pathname, navigate]);

  const handleLogout = useCallback(() => {
    setToken(null);
    setUser(null)
  }, []);

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <demoTwoContext.Provider value={value}>{children}</demoTwoContext.Provider>;
};

export default AuthProvider;
