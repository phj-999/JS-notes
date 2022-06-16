import React from "react";

const NoAccess = ({ permissionsNeeded }) => {
  return (
    <div>
      <h3>
      没有权限 -- 你需要如下权限{" "}
      </h3>
      <span className="permission-text">{permissionsNeeded}</span>
    </div>
  );
};

export default NoAccess;