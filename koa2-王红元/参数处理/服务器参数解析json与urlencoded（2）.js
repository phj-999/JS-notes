const bodyParser = require('body-parser');
const koa = require('koa');
const router = require('./router/user');

const app = new koa()

const loginRouter = new Router({prefix:"/login"})
app.use(bodyParser())

loginRouter.post('/',upload.any(),(ctx,next)=>{
    console.log(ctx.req.body);//要从req里面拿
})

//ctx.request.body是koa中的自定义对象  ctx.req.body是原生http中的自定义对象 upload.any()解析后存在  ctx.req.body里面

app.use(loginRouter.routes())
app.use (router.allowedMethods())  //没请求到的数据一般返回not found   真实开发中用这个中间件来提示某些功能是否被允许的


app.listen(8000, () => {
    console.log('路由启动成功');
})