const Router = require('koa-router');
const { avatarInfo } = require('../controller/user.controller');

const userRouter = new Router({prefix:'/user'})

const controller = require('../controller/user.controller')

const {
    verifyUser,
    handlePassword 
} = require ('../middleware/user.middleware.js')

userRouter.post('/', verifyUser, handlePassword, controller.create)

userRouter.get ('/:userId/avatar', avatarInfo)

module.exports = userRouter