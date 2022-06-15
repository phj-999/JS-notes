import { Route, Routes } from "react-router-dom";
import React from "react";

import AuthProvider from "../components/Auth/AuthProvider ";
import Navigation from "../components/Navigation";

import Home from "../views/main-pages/Home";
import Dashboard from "../views/main-pages/Dashboard";
import NoMatch from "../views/notFound/NoMatch";
import ProtectedRoute from "../router/Private-Route/ProtectedRoute";

export function AppTwoDemo() {
  return (
    <AuthProvider>
      <h1>react router</h1>
      {/* 传递token的方式 */}
      {/* <Navigation token={token} onLogout={handleLogout} />  */}

      {/* context的方式 */}
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={//现在，当用户单击按钮注销时，他们将通过新的受保护路由获得隐式重定向，因为令牌不再存在。此外，如果用户未通过身份验证，则此用户无法访问受保护的路由（此处：仪表板页面）。
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}
