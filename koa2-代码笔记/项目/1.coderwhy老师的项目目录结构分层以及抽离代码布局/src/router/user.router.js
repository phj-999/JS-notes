const Router = require('koa-router');

const userRouter = new Router({prefix:'/user'})

const controller = require('../controller/user.controller')

userRouter.post('/',controller.create)

module.exports = userRouter