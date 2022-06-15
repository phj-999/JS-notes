import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
/**
 *组件将检查身份验证令牌是否存在。
 *如果存在，则该组件将呈现其子级。
 *如果它不存在，用户将获得一个条件重定向
 */
const ProtectedRoute = (props) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/home" replace />;
  }
  return props.children
};

export default ProtectedRoute;
