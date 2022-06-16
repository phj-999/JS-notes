import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
  });
  return (
    <>
      <h1>React Router</h1>

      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <NavLink to="/home" style={style}>
          Home
        </NavLink>
        <NavLink to="/users" style={style}>
          Users
        </NavLink>
      </nav>
      <main style={{ padding: "1rem 0" }}>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
