import React from "react";
import { Link } from 'react-router-dom';

const Navigation = (props) => {
 
  return (
    <nav
    style={{
      borderBottom: 'solid 1px',
      paddingBottom: '1rem',
    }}
  >
    <Link to="/home">Home</Link>
    <Link to="/users">Users</Link>
  </nav>
  );
};

export default Navigation;
