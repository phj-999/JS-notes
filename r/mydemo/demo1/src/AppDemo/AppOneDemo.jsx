import { Route, Routes } from "react-router-dom";

import Navigation from "../components/Navigation";
import React, { useCallback, useState } from "react";
import { fakeAuth } from "../utils/fakeAuth";
import Home from "../views/main-pages/Home";
import Dashboard from "../views/main-pages/Dashboard";
import NoMatch from "../views/notFound/NoMatch";
import { AuthContext } from "../context/authtext";


export function AppOneDemo() {
  const [token, setToken] = useState(null);

  const handleLogin = useCallback(async () => {
    const token = await fakeAuth();
    setToken(token);
  }, []);

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

