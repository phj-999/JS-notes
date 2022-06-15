import { Button } from "antd";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Home = (props) => {
  // const { onLogin } = props;
  const { onLogin } = useAuth();
  return (
    <>
      <h1>公开界面</h1>
      <div>home</div>
      <Button type="primary" onClick={onLogin}>
        sign in
      </Button>
    </>
  );
};

export default Home;
