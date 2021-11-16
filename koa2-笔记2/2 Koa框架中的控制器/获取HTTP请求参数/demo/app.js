const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const app = new koa()
const router = Router({
	prefix: '/user'
})


router.get('/', async (ctx) => {
	// ctx.body = '<h1>这是用户首页</h1>'
	ctx.set("Allow","GET,POST")
	ctx.status = 301
	ctx.body = {
		code: 200,
		msg: '这是请求首页的信息'
	}
})

router.get('/find/:id', async (ctx) => {
	let id = ctx.params.id
	console.log(id)
	ctx.body = '这是用户首页'

})


router.delete('/del', async (ctx) => {
	// let {id} = ctx.request.query
	let {id} = ctx.query
	console.log(id)
	ctx.body = '删除用户'
})

router.post('/add', async (ctx) => {
	let {username,pwd} = ctx.request.body
	console.log(username,pwd)
	ctx.body = '添加用户'
})

app.use(bodyparser())
app.use(router.routes())

app.listen(3000)