import React from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../components/Navigation";

import Layout from "../views/Layout";
import Home from "../views/main-pages/Home";
import User from "../views/main-pages/users/User";
import Users from "../views/main-pages/users/Users";
import NoMatch from "../views/notFound/NoMatch";

export function AppOneDemo() {
  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];
  return (
    <>
      <h1>react router 6</h1>

      <Navigation />
      <Routes>
        <Route element={<Layout />}>
          <Route path="home" index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users users={users} />}>
            {/* 标识符动态匹配的动态路由 */}
            <Route path=":userId" element={<User />}/>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}
