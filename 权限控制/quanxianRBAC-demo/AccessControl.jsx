
const checkPermissions = (userPermissions, allowedPermissions) => {
  // allowedPermissions意思是要求的权限 为0表示都允许
  if (allowedPermissions.length === 0) {
        return true
  }
   // 这里操作是遍历所有权限 userPermissions里的 单个 看单个有没有在允许的 allowedPermission数组里
  //  如果包含则返回 true，否则返回 false。
   return userPermissions.some(permission => allowedPermissions.includes(permission))
}


const AccessControl = (props) => {
  const { userPermissions = [],
    allowedPermissions = [],
    children,
    renderNoAccess = () => <div>没有权限</div>,
    accessCheck,
    extraAccessData} = props

    let permitted 
       if (accessCheck) {
        // 是否登录判定 + (额外权限判定)
        permitted = accessCheck(extraAccessData, user) && checkPermissions(userPermissions, allowedPermissions);
    } else {
        // 普通权限判定
        permitted = checkPermissions(userPermissions, allowedPermissions);
    }
    if (permitted) {
        return children
    } else {
        return renderNoAccess();
    }
}

const mapStateToProps = state => ({
    user: state.user,
    userPermissions: state.user && state.user.permissions
})

export default connect(mapStateToProps)(AccessControl)