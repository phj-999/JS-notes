const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const jsonerror = require('koa-json-error')
const router = require('./routes/user')
const app = new koa()

app.use(jsonerror())
app.use(bodyparser())
app.use(router.routes())

app.listen(3000)