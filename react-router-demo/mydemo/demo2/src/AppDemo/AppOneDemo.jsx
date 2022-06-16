import React from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../components/Navigation";

import Home from "../views/main-pages/Home";
import Users from "../views/main-pages/users/Users";
import NoMatch from "../views/notFound/NoMatch";


export function AppOneDemo() {

  return (
    <>
      <h1>react router</h1>

      <Navigation />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

