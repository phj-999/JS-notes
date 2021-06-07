const Router = require('koa-router');

const userRouter = new Router({prefix:'/user'})

const controller = require('../controller/user.controller')

const {verifyUser} = require ('../middleware/user.middleware.js')

userRouter.post('/',verifyUser,controller.create)

module.exports = userRouter