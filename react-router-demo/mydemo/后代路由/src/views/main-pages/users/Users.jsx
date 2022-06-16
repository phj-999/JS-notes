import React from "react";
import { Link, Outlet } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <Outlet />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>
              {user.fullName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Users;
