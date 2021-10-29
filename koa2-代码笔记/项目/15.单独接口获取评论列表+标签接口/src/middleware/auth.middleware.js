const errorType = require('../constants/error-types')

const service = require('../service/user.service');

const authService = require('../service/auth.service');

const md5password = require('../utils/password-handle');

const jwt = require('jsonwebtoken');

const {
    PUBLIC_KEY
} = require('../app/config')



const verifyLogin = async (ctx, next) => {

    console.log('验证登录的middleware');
    //获取账号密码

    const {
        name,
        password
    } = ctx.request.body

    //判断是否为空

    if (!name || !password) {

        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)

        return ctx.app.emit('error', error, ctx)
    }

    //判断用户是否存在

    const result = await service.getUserByName(name)

    const user = result[0]

    if (!user) {

        const error = new Error(errorType.USER_DOES_NOT_EXISTS)

        return ctx.app.emit('error', error, ctx)

    }

    //判断密码是否和数据库中的密码一致(加密)

    if (md5password(password) !== user.password) {

        const error = new Error(errorType.PASSWORD_IS_INCORRENT)

        return ctx, app.emit('error', error, ctx)

    }

    ctx.user = user

    await next()
}

const verifyAuth = async (ctx, next) => {
    console.log('验证授权的middleware');
    //获取token
    const authorization = ctx.headers.authorization

    if (!authorization) {
        const error = new Error(errorType.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx)
    }

    const token = authorization.replace('Bearer', '')

    //验证token
    try {
        jwt.verify(token, PUBLIC_KEY, {

            algorithms: ['RS256']

        })

        ctx.user = result

        await next()

    } catch (error) {

        const error = new Error(errorType.UNAUTHORIZATION)

        ctx.app.emit('error', error, ctx)
    }
}

// const verifyPermission = async (ctx,next) =>{
//     console.log('验证权限的middleware');

//     //获取参数
//     const {momentId} = ctx.params

//     const {id} = ctx.user

//     //查询是否具备权限
// try {
//     const isPermission = await authService.checkMoment (momentId,id)

//     if (!isPermission) throw new Error()

//     await next()

// } catch (error) {

//     const error = new Error (errorType.UNPERMISSION)

//     return ctx.app.emit('error',error,ctx)

//     }

// }
跟随auth.service.js里面把verifyPermission改成既支持验证权限也验证更新评论权限的中间件如下
上面是修改前的代码只支持moment一处的权限验证
以下是改成支持moment和comment和所有的权限验证的方式一
//用闭包的形式
// const verifyPermission = (tableName) =>{
//     return async (ctx, next) => {
//     console.log('验证权限的middleware');

//     //获取参数
//     const {momentId} = ctx.params

//     const {id} = ctx.user

//     //查询是否具备权限
// try {
//     const isPermission = await authService.checkResource (tableName, momentId, id)

//     if (!isPermission) throw new Error()

//     await next()

// } catch (error) {

//     const error = new Error (errorType.UNPERMISSION)

//     return ctx.app.emit('error',error,ctx)

//     }
// }

// }


以下是方式二

const verifyPermission = async (ctx,next) =>{
    console.log('验证权限的middleware');

    //获取参数（commentId:'1'）
    const [resourceKey] = Object.keys (ctx.params)
    const tableName = resourceKey.replace ('Id','')
    const resourceId = ctx.params[resourceKey]
    const {id} = ctx.user

    const {id} = ctx.user

    //查询是否具备权限
try {
    const isPermission = await authService.checkMoment (tableName,resourceId, id)

    if (!isPermission) throw new Error()

    await next()

} catch (error) {

    const error = new Error (errorType.UNPERMISSION)

    return ctx.app.emit('error',error,ctx)

    }

}


module.exports = {
    verifyLogin,

    verifyAuth,

    verifyPermission,

}