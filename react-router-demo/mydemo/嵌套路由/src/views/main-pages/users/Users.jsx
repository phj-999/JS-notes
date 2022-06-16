import React, { useCallback, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { Input } from "antd";

const Users = ({ users }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("name") || "";
  const { Search } = Input;

  // 搜索
  const handleSearch = useCallback(
    (value,event) => {
      //const name = event.target.value;
      const name = value;
      if (name) {
        setSearchParams({ name: value });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Users</h2>
      {/* 搜索 */}
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />

      <ul>
        {users
          .filter((user) =>
            user.fullName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          )
          .map((user) => (
            <li key={user.id}>
              {/* <Link to={`/users/${user.id}`}>
              {user.fullName}
            </Link> */}
              <Link to={user.id}>{user.fullName}</Link>
            </li>
          ))}
      </ul>
      <Outlet />
    </main>
  );
};

export default Users;
