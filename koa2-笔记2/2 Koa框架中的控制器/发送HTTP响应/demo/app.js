const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const app = new koa()
const router = Router({
	prefix: '/user'
})

let userList = [{username:'tom',pwd:'123'}]

//查询所有用户
router.get('/', async (ctx) => {
	// ctx.body = '<h1>这是用户首页</h1>'
	// ctx.set("Allow","GET,POST")
	// ctx.status = 301
	// ctx.body = {
	// 	code: 200,
	// 	msg: '这是请求首页的信息'
	// }

	ctx.body = {
		data: userList
	}
})

router.get('/find/:id', async (ctx) => {
	let id = ctx.params.id
	// console.log(id)
	// ctx.body = '这是用户首页'

	ctx.body = {
		code: 200,
		user: userList[Number(id)]
	}
})

//删除用户
router.delete('/del', async (ctx) => {
	// let {id} = ctx.request.query
	// let {id} = ctx.query
	// console.log(id)
	// ctx.body = '删除用户'

	let {id} = ctx.request.body
	userList.splice(Number(id),1)
	ctx.body = {
		code: 200,
		msg: '删除成功'
	}
})

//修改用户
router.put('/update', async (ctx) => {
	let user = ctx.request.body
	userList.splice(Number(user.id),1,{
		username: user.username,
		pwd: user.pwd
	})
	ctx.body = {
		code: 200,
		msg: '修改成功'
	}
})

//添加用户
router.post('/add', async (ctx) => {
	let {username,pwd} = ctx.request.body
	userList.push({
		username,
		pwd
	})
	ctx.body = {
		code: 200,
		msg: '添加成功'
	}
})

app.use(bodyparser())
app.use(router.routes())

app.listen(3000)