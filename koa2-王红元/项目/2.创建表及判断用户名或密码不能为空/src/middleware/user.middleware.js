
const errorType = require('../constants/error-types')

const verifyuser = (ctx,next)=>{
    
    //获取用户名和密码
    const { name, password } = ctx.request.body

    //判断用户名或密码不能为空
    if ( !name || !password || name === '' || password === '' ) {
       
        const error = new Error ('errorType.NAME_OR_PASSWORD_IS_REQUIRED')

        return ctx.app.emit ('error',error,ctx)

    }

    await next ()  //下一个中间件如果有异步  需要用到await
}

module.exports = {verifyuser}