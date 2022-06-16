import { Button } from "antd";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Home = (props) => {
  const { onLogin,user } = useAuth();
  console.log(user);
  return (
    <>
      <h1>公开界面home</h1>
      <Button type="primary" onClick={onLogin}>
        sign in
      </Button>
      {
        user && <div><h2>有了，登陆了</h2>
           <h3>userid: {user.id}</h3>
           <h3>userid: {user.name}</h3>
        </div>

      }
    </>
  );
};

export default Home;
