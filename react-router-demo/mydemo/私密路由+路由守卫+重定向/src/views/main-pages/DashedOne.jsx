import React from "react";
import { useAuth } from "../../hooks/useAuth";

const DashedOne = () => {
  const { token } = useAuth()
  return (
    <>
      <h1>受保护页面DashedOne</h1>
      <h3>DashedOne--token : {token}</h3>
    </>
  );
};

export default DashedOne;
