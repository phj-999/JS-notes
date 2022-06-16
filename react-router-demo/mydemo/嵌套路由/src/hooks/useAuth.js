import React from "react";
import { demoTwoContext } from "../components/Auth/AuthProvider ";
// import { AuthContext } from "../context/authtext";

export const useAuth = () => {
  return React.useContext(demoTwoContext);
};
