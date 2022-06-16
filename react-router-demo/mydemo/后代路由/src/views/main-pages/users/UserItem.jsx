import React from 'react'

const UserItem = () => {
    const { userId } = useParams();
  
    return (
      <>
        <h2>Users</h2>
        <h3>User Item: {userId}</h3>
  
        <Link to="/users">Back to Users</Link>
      </>
    );
  }

export default UserItem