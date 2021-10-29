
const Router  = require("Router");

const authRouter = new Router();

const {login,success} = require ('../controller/auth.controller.js')

const {
    verifyLogin,
    verifyAuth
} = require('../middleware/auth.middleware')

authRouter.post('/login', verifyLogin, login)

authRouter.get ('/test', verifyAuth, success)  //验证是否授权

module.exports = authRouter