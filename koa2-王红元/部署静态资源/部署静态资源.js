const koa  = require("koa");

//需要安装koa-static
const staticAssets = require('koa-static')

const app = new koa()

app.use (staticAssets('./build'))//静态路径

app.use(uploadRouter.routes())
app.listen(8000,()=>{...})