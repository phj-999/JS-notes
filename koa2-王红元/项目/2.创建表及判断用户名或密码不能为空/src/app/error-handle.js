const errorTypes = require('../constants/error-types');

const errorhandle = (error, ctx) => {

    let status, message;

    switch (error.message) {

        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:

            status = 400 //bad request

            message = '用户名或密码不能为空'

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