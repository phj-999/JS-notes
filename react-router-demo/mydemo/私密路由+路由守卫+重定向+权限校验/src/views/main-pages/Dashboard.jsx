import React from "react";
// import { AuthContext } from "../../context/authtext";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { token } = useAuth()
  return (
    <>
      <h1>受保护页面</h1>
      <div>dashboard : {token}</div>
    </>
  );
};

export default Dashboard;
