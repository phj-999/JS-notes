const errorTypes = require('../constants/error-types');

const errorhandle = (error, ctx) => {

    let status, message;

    switch (error.message) {
        //用户名或密码不能为空
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:

            status = 400 //bad request

            message = '用户名或密码不能为空'

            break;

            //用户名已存在
        case errorTypes.USER_DOES_NOT_EXISTS:

            status = 409 // conflict 冲突

            message = '用户名已存在'

            break;

            //用户不存在
        case errorTypes.USER_ALREADY_EXISTS:

            status = 400 // 参数错误

            message = '用户名不存在'

            break;

            //密码错误
        case errorTypes.PASSWORD_IS_INCORRENT:

            status = 400 // 参数错误

            message = '密码错误'

            break;

            //用户未授权
        case errorTypes.UNAUTHORIZATION:

            status = 401 // 无效token

            message = '无效的token'

            break;

            //
            case errorTypes.UNPERMISSION:

                status = 400 // 未授权
    
                message = '您不具备操作的权限'
    
                break;

        default:

            status = 404

            message = 'NOT FOUND'

            break;
    }



    ctx.status = status

    ctx.body = message

}

module.exports = errorhandle