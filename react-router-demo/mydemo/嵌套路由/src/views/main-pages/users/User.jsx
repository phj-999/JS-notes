import { Link, Outlet } from "react-router-dom";

const User = () => {

  return (
    <>
      <h2>User组件</h2>
      <h1>User</h1>

      <nav>
        <Link to="profile">Profile</Link>
        <Link to="account">Account</Link>
      </nav>
      <Outlet />
    </>
    
  );
};

export default User;
