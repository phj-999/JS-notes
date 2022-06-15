import React, { useContext } from "react";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

const Navigation = (props) => {
  //传递token的方式
  const {
    //token,
    onLogout
  } = props
  // context的方式
  const token = useContext(AuthContext)
  
  return (
    <ul>
     <li><NavLink to={"/home"}>home</NavLink></li>
     <li><NavLink to={"/dashboard"}>dashboard</NavLink></li>
     {
      token && (
        <Button type="danger" onClick={onLogout}>sing out</Button>
      )
     }
   </ul>
  );
};

export default Navigation;
