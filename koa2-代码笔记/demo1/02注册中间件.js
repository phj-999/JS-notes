const koa = require('koa');

const app = new koa()

app.use((ctx, next) => {
    console.log('中间件被执行');
})


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



























app.listen(8000, () => {
    console.log('服务器启动成功');
})