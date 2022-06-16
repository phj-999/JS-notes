import { Route, Routes } from "react-router-dom";
import React from "react";

import AuthProvider from "../components/Auth/AuthProvider ";
import Navigation from "../components/Navigation";

import Home from "../views/main-pages/Home";
import Dashboard from "../views/main-pages/Dashboard";
import NoMatch from "../views/notFound/NoMatch";
import ProtectedRoute from "../router/Private-Route/ProtectedRoute";
import DashedOne from "../views/main-pages/DashedOne";

export function AppThreeDemo() {
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
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard/> } />
            <Route path="/dashedone" element={<DashedOne/> } />
        </Route>
        
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}
