import React from "react";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
// import { AuthContext } from "../context/authtext";
import { useAuth } from "../hooks/useAuth";

const Navigation = (props) => {
  //传递token的方式
  // const {
    //token,
  //   onLogout
  // } = props

  // context的方式
  // const token = useContext(AuthContext)
  const { onLogout,token } = useAuth()
  
  return (
    <ul>
     <li><NavLink to={"/home"}>home</NavLink></li>
     <li><NavLink to={"/dashboard"}>dashboard</NavLink></li>
     <li><NavLink to={"/dashedone"}>DashedOne</NavLink></li>
     {
      token && (
        // props形式传递方法
        // <Button type="danger" onClick={props.onLogout}>sing out</Button>

        //hooks形式
       <Button type="danger" onClick={onLogout}>sing out</Button>
      )
     }
   </ul>
  );
};

export default Navigation;
