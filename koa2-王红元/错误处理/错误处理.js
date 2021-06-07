const koa  = require("koa");

const app = new koa()
//思路 emit发送  on监听  具体逻辑在后面项目文件
app.use((ctx,next)=>{
    const isLogin = false
    if (!isLogin) {
        ctx.app.emit('error',new Error(您还未登录'))
    }
})

app.on('error',(err,ctx)=>{
ctx.status = 401    //401是未授权  未登录
ctx.body = error.message
})

app.use(uploadRouter.routes())
app.listen(8000,()=>{...})