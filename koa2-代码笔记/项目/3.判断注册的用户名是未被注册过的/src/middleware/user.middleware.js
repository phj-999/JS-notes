
const errorType = require('../constants/error-types')

const service = require('../service/user.service');


const verifyuser = (ctx,next)=>{
    
    //获取用户名和密码

    const { name, password } = ctx.request.body

    //判断用户名或密码不能为空

    if ( !name || !password || name === '' || password === '' ) {
       
        const error = new Error (errorType.NAME_OR_PASSWORD_IS_REQUIRED)

        return ctx.app.emit ('error',error,ctx)

    }

    //判断这次注册的用户名是没有被注册过的

    const result = await service.getUserByName(name)

    console.log(result);

    if (result.length) {

        const error = new Error (errorType.USER_ALREADY_EXISTS)

        return ctx.app.emit ('error', error, ctx)
    
    }

    await next ()  //下一个中间件如果有异步  需要用到await
}

module.exports = {verifyuser}