import {observable,action,computed} from 'mobx';
import Axios from "../util/axios";
import Api from "../api";

/**
 * user :{userInfo, menuInfo}
 * token
 * */
class user{
    user
    token
    @observable isLogin = false;
    @computed get user(){
        return JSON.parse(sessionStorage.getItem('user')||'{}');
    }
    set user(value){
        sessionStorage.setItem('user',JSON.stringify(value));
    }

    @computed get token(){
        return sessionStorage.getItem('token')||'';
    }
    set token(value){
        sessionStorage.setItem('token',value);
    }

    @action
    userLogin(userInput){  //userInfo:登录界面，用户写的用户名，密码，记住密码
        //传给后台进行处理
       return new Promise((resolve, reject)=>{
           // 直接对象，有可能后台不能解析，把对象转成字符串的形式， qs模块  qs.stringify()
           Axios.post(Api.user.UserLogin,userInput).then((res)=>{
               if(res.data.returnCode === 200){
                   //存储相应的数据，在mobx 中
                   this.user = res.data.data;
                   this.token = res.data.token;
                   resolve(res.data);
               }else{
                  reject(res.data);
               }
           })
       })
    }
}

export default new user();

