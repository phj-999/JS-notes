import { Button } from "antd";
import React from "react";

const Home = (props) => {
  const { onLogin } = props;
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
