const koa = require('koa');

const app = new koa();

const bodyparser = require('koa-bodyparser');

const userRouter = require('../router/user.router')

app.use(bodyparser())
app.use (userRouter.routes())
app.use (userRouter.allowedMethods())



module.exports = app