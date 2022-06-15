import { Route, Routes } from "react-router-dom";
import Dashboard from "./views/main-pages/Dashboard";
import Home from "./views/main-pages/Home";
import NoMatch from "./views/notFound/NoMatch";
import "./App.css";
import Navigation from "./components/Navigation";
import React, { useCallback, useState } from "react";
import { fakeAuth } from "./utils/fakeAuth";

export const AuthContext = React.createContext()
function App() {
  const [token, setToken] = useState();
  // 登录
  const handleLogin = useCallback(async () => {
    const usertoken = await fakeAuth();
    setToken(usertoken);
  }, []);
  // 退出
  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={token}>
      <h1>react router</h1>
      {/* 传递token的方式 */}
      {/* <Navigation token={token} onLogout={handleLogout} />  */}

      {/* context的方式 */}
      <Navigation onLogout={handleLogout} />
      <Routes>
        <Route index element={<Home onLogin={handleLogin} />} />
        <Route path="/home" element={<Home onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
