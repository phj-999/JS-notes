
const Router  = require("Router");

const authRouter = new Router();

const {login} = require ('../controller/auth.controller.js')

const {verifyLogin} = require('../middleware/auth.middleware')

authRouter.post('/login',verifyLogin,login)

module.exports = authRouter