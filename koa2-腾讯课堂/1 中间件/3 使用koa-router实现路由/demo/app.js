const koa = require('koa')
const Router = require('koa-router')
const app = new koa()
const router = Router({
	prefix: '/user'
})

router.get('/', async (ctx) => {
	ctx.body = '这是用户首页'
})

router.get('/del', async (ctx) => {
	ctx.body = '删除用户'
})

router.post('/add', async (ctx) => {
	ctx.body = '添加用户'
})

app.use(router.routes())

app.listen(3000)