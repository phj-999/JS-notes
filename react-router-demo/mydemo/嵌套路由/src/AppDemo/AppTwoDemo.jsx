import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "../views/main-pages/Home";
import User from "../views/main-pages/users/User";
import Users from "../views/main-pages/users/Users";
import NoMatch from "../views/notFound/NoMatch";

export function AppTwoDemo() {
    const users = [
        { id: '1', fullName: 'Robin Wieruch' },
        { id: '2', fullName: 'Sarah Finnley' },
      ];
    
  return (
    <>
      <h1>react router 6</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users users={users} />}>
          <Route path=":userId" element={<User />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
