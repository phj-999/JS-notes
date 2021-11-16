/**
 * 异步处理请求
 *  */
 import qs from 'qs'
 import * as auth from "./utils/auth-provider";
 
 const apiUrl = process.env.REACT_APP_API_URL;
 
 interface Config extends RequestInit {
     token?: string,
     data?: object
 }
 
 export const http = async (
     endpoint: string,
     { data, token, headers, ...custonConfig
     }: Config = {}) => {
     const config = {
         method: "GET",
         headers: {
             Authorization: token ? `Bearer ${token}` : "",
             'Content-type': data ? "application/json" : ''
         },
         ...custonConfig
     }
 
     if (config.method.toUpperCase() === 'GET') {
         endpoint += `?${qs.stringify(data)}`
     } else {
         config.body = JSON.stringify(data || {})
     }
     return window.fetch(`${apiUrl}/${endpoint}`, config).then(
         async (response) => {
             //返回401 退出
             if (response.status === 401) {
                 await auth.logout();
                 window.location.reload();
                 return Promise.reject({ message: "请重新登录" });
             }
             const data = await response.json()
             if (response.ok) {
                 return data
             } else {//手动抛出错误
                 return Promise.reject(data)
             }
         }
     )
 }