const koa = require('koa');
const router = require('./router/user');

const app = new koa()

const userRouter = require('./router/user');

/**
 * @params query 与 params
 */
//postman 测试 /user/abc?name=why&age=18
userRouter.get('/:id',(ctx,next)=>{
    console.log(ctx.request.params);  //返回 {id:'abc'}
    console.log(ctx.request.query);    //返回 [Object: null prototype] {name:'why',age:'18'}
})








app.use(userRouter.routes())
app.use (router.allowedMethods())  //没请求到的数据一般返回not found   真实开发中用这个中间件来提示某些功能是否被允许的


app.listen(8000, () => {
    console.log('路由启动成功');
})