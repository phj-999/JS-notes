//demo具体看后面项目demo文件夹
const koa  = require("koa");
const Router = require("koa-router");

const app = new koa()

app.use((ctx,next)=>{
    // ctx.satus=200
    // ctx.response.body={
    //     name:'coderwhy',
    //     age:18,
    //     avatar_url: 'http:.......'
    // }

//或者
   //  ctx.satus=200
  //  ctx.response.body=['abc','saasdas','asdasd']
})



app.use(uploadRouter.routes())
app.listen(8000,()=>{...})