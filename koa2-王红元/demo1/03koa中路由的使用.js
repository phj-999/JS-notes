const koa = require('koa');
const router = require('./router/user');

const app = new koa()

const userRouter = require('./router/user');


app.use((ctx, next) => {
    console.log('中间件被执行');
    next()  //无next就直接结束了
})

app.use(userRouter.routes())
app.use (router.allowedMethods())  //没请求到的数据一般返回not found   真实开发中用这个中间件来提示某些功能是否被允许的


/**
 * @param
 * 没提供以下注册方式
 * app.use('/',(ctx,next)=>{
    console.log('中间件被执行');
})
    app.get('/',(ctx,next)=>{
    console.log('中间件被执行');
})
app.use((ctx,next)=>{
    console.log('中间件被执行');
},(ctx,next)=>{})
 */

app.use((ctx, next) => {
    if (ctx.request.url === '/login') {
        if (ctx.req.method === 'GET') {
            ctx.response.body = '登陆成功'
        }
    } else {
        ctx.response.body = 'hello world'
    }
})   //判断方式


//以上代码太复杂，转成路由方式，让路由判断使用哪个中间件
//express中创建路由只需要   express.Router() 就可以创建路由
//koa中需要安装第三方库 koa-router

//新建router文件夹  






















app.listen(8000, () => {
    console.log('路由启动成功');
})