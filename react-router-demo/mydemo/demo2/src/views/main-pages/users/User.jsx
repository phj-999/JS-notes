import { Link, useParams } from "react-router-dom";
import {Button} from 'antd'

const User = ({onRemoveUser}) => {
  const { userId } = useParams();

  return (
    <>
      <h2>User组件</h2>
      <h2>User: {userId}</h2>
      <Button shape="circle" type="primary" onClick={() => onRemoveUser(userId)} >删除用户</Button>
      <Link to="/users">Back to Users</Link>
    </>
  );
};

export default User;
