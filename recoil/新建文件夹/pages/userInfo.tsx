import React from 'react'
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil'
import { loginStatusAtom, userInfoAtom } from '../store/state/userState'

const userInfo = () => {

   const [userInfo, setUserInfo ] = useRecoilState(userInfoAtom)
   const loginStatus = useRecoilValue(loginStatusAtom)

   const doLogin = useRecoilTransaction_UNSTABLE(({get, set})=>status=>{
    const user = get(userInfoAtom)
    const isLogin = get(loginStatusAtom)
    if (status) {
        set(userInfoAtom, {...user, 'score': user.score+10})
    }
    set(loginStatusAtom, !isLogin)
    // 设置。。。
    // 设置。。。
   })


   const changeScore = () => {
    // Mutable的写法   dangerouslyAllowMutability: true
    // userInfo.score +=10
    // setUserInfo({...userInfo})

    // Immutable的写法 
    const newUserInfo = produce((userInfo, draft)=>{
        draft.score +=10
      
    })
    setUserInfo(newUserInfo)
}

  return (
    <div>userInfo</div>
  )
}

export default userInfo