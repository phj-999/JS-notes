import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Account from "../views/main-pages/Account";
import Home from "../views/main-pages/Home";
import Profile from "../views/main-pages/Profile";
import User from "../views/main-pages/users/User";
import NoMatch from "../views/notFound/NoMatch";

export function AppOneDemo() {
  return (
    <>
      <h1>react router 6</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/user">User</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="user" element={<User />}>
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
