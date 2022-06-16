import { Route, Routes } from "react-router-dom";
import React from "react";

import AuthProvider from "../components/Auth/AuthProvider ";
import Navigation from "../components/Navigation";

import Home from "../views/main-pages/Home";
import Dashboard from "../views/main-pages/Dashboard";
import NoMatch from "../views/notFound/NoMatch";
import ProtectedRoute from "../router/Private-Route/ProtectedRoute";
import DashedOne from "../views/main-pages/DashedOne";
import Analytics from "../views/main-pages/Analytics";
import { useAuth } from "../hooks/useAuth";
import Admin from "../views/main-pages/Admin";

export function AppThreeDemo() {
  const { user } = useAuth();
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
        <Route element={<ProtectedRoute isAllowed={!!user} redirectPath="/home" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashedone" element={<DashedOne />} />
        </Route>
        <Route
          path="/analytics"
          element={ //权限没有就进不去
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={!!user && user.permissions.includes("analyze")}
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={!!user && user.roles.includes('admin')}
            >
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}
