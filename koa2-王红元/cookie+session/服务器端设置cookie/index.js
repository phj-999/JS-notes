const koa = require('koa');
const Router = require('koa-router');

const app = new koa();

const testRouter = new Router()

testRouter.get('/test', (ctx,next) => {  //设置cookie
    ctx.cookies.set('name','title',{
        maxAge: 5*1000
    })
    ctx.body='服务器端设置cookie'
})

testRouter.get('/demo',(ctx,next)=>{
    //读取cookie
    const value = ctx.cookies.get('name')
    ctx.body = '你的cookie'
})

app.use(testRouter.routes())
app.use(testRouter.allowedMethods())

app.listen(8000,()=>{
    console.log('启动成功');
})