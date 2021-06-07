const koa = require('koa');

const app = new koa();

const bodyparser = require('koa-bodyparser');

const userRouter = require('../router/user.router')

const errorhandle = require('./error-handle')

app.use(bodyparser())
app.use (userRouter.routes())
app.use (userRouter.allowedMethods())

app.on('error',errorhandle)

module.exports = app