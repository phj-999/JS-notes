import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  selectUser
} from '../store/features/user/userSlice'
import './App.css';

import {userSafetyInspector, userNKScientist} from './permissions'
import AccessControl from "../components/AccessControl";
import UserDetails from "../components/UserDetails";
import StatsPanel from "../components/StatsPanel";
import ShutdownPanel from "../components/ShutdownPanel";
import NoAccess from "../components/NoAccess";
import EmergencyAlertPanel from "../components/EmergencyAlertPanel";

function App() {
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
      <>
      <div>
         用户信息：{JSON.stringify(userInfo)}
      </div>

          <div className="example-app-container">
              <div>
                  {!userInfo ? (
                      <div>
                          <button onClick={() => dispatch(loginUser(userNKScientist))}>
                              反应堆管理者登录
                          </button>
                          <button onClick={() => dispatch(loginUser(userSafetyInspector))}>
                              安全员登录
                          </button>
                      </div>
                  ) : (
                      <button onClick={() =>dispatch(loginUser())}>登出</button>
                  )}
              </div>

              <UserDetails user={userInfo} />
              <div>虚线框才是权限管理区域：</div>

              {/*// 这里是最外面一层 还没有登录 优先级更高的是USA判断 还没有到permission判断 permission判断需要登录 但是store为null 会报错 所以分为两级 这个是登录组件写在一起 如果login分开 鉴权组件写在另一页没有和这个问题*/}
              {/*// 1. 未登录*/}
              {/*// 2. 登陆了*/}
              {/*//   1. 登陆了管理者权限*/}
              {/*//   2. 登陆了观察员权限*/}
              <div style={{border: '5px dotted pink'}}>
              <AccessControl
                  extraAccessData={{ allowedNationality: "USA" }}
                  accessCheck={(extraAccessData, user) =>
                      user // user 用来判断是否登录，
                      &&
                      user.nationality === extraAccessData.allowedNationality  // extraAccessData 判断额外增添条件
                  }
                  renderNoAccess={() => (
                      <div className="countryWarning">
                          <div className="noAccessText">
                              您需要登录并且只有美国🇺🇸的原子能工程师可以操作这个系统。
                          </div>
                      </div>
                  )}
              >
                  <AccessControl
                      allowedPermissions={["read:stats"]}
                      renderNoAccess={() => <NoAccess permissionsNeeded="read:stats" />}
                  >
                      <StatsPanel />
                  </AccessControl>

                  <AccessControl
                      allowedPermissions={["control:emergencyalert"]}
                      renderNoAccess={() => (
                          <NoAccess permissionsNeeded="control:emergencyalert" />
                      )}
                  >
                      <EmergencyAlertPanel />
                  </AccessControl>

                  <AccessControl
                      allowedPermissions={["control:reactor"]}
                      renderNoAccess={() => (
                          <NoAccess permissionsNeeded="control:reactor" />
                      )}
                  >
                      <ShutdownPanel />
                  </AccessControl>
              </AccessControl>

              </div>
              
              
          </div>
      </>

  );
}

export default App;