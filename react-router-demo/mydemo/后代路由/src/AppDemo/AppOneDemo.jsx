import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Layout from "../views/Layout";
import Home from "../views/main-pages/Home";
import Users from "../views/main-pages/users/Users";
import UserList from "../views/main-pages/users/UserList";
import NoMatch from "../views/notFound/NoMatch";

export function AppOneDemo() {
  const users = [
    { id: "1", firstName: "Robin", lastName: "Wieruch" },
    { id: "2", firstName: "Sarah", lastName: "Finnley" },
  ];
  return (
    <>
      <h1>react router 6</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users" element={<UserList users={users} />} />

          {/* <Route path="users/:userId" element={<UserItem  />} /> */}
          {/* 或者 */}
          <Route path="users/*" element={<Users users={users} />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}
