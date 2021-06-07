const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('./routes/user')
const app = new koa()

app.use(async (ctx,next) => {
	try {
		await next()
	} catch (err) {
		ctx.status = err.status || err.statusCode || 500
		ctx.body = {
			message: err.message
		}
	}
})

app.use(bodyparser())
app.use(router.routes())

app.listen(3000)