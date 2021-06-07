const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const jsonerror = require('koa-json-error')
const parameter = require('koa-parameter')
const router = require('./routes/user')
const app = new koa()

app.use(jsonerror())
app.use(bodyparser())
app.use(parameter(app))
app.use(router.routes())

app.listen(3000)