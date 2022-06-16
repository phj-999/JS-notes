import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const Users = ({users}) => {
    return (
      <main style={{ padding: '1rem 0' }}>
        <h2>Users</h2>
        <ul>
        {users.map((user) => (
          <li key={user.id}>
            {/* <Link to={`/users/${user.id}`}>
              {user.fullName}
            </Link> */}
           <Link to={user.id}>
              {user.fullName}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
      </main>
    );
  };

export default Users