const koa = require('koa');

const app = new koa()

app.use((ctx,next)=>{
    console.log('中间件被执行');
})

app.listen(8000,()=>{
    console.log('服务器启动成功');
})