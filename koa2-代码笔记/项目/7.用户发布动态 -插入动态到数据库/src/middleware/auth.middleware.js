const errorType = require('../constants/error-types')

const service = require('../service/user.service');

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



module.exports = {
    verifyLogin
}