import React from "react";
const UserList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <h3>User List</h3>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>
              {user.firstName} {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;
