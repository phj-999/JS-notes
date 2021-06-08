const Router = require('koa-router');

const userRouter = new Router({prefix:'/user'})

const controller = require('../controller/user.controller')

const {
    verifyUser,
    handlePassword 
} = require ('../middleware/user.middleware.js')

userRouter.post('/', verifyUser, handlePassword, controller.create)

module.exports = userRouter