const koa  = require("koa");
const Router = require("koa-router");

const app = new koa()
//demo版本 与真实还是有区别 真实开发中代码在后面文件夹中
const uploadRouter = new Router({prefix:'/upload'})  //w文件上传都交给此路由处理


// const storage = multer.diskstorage({
//     destination:..,,
//     filename,      
// })   要添加其他信息的写法

const upload = multer({
    dest:'./uploads/'         //路径  无此文件夹会自动生成

    // storage
})

//路由，single表示上传一个，括号里面是文件名   图片上传 文件上传都是这个
uploadRouter.post ('/avatar',upload.single('avatar'),(ctx,next)=>{  
    console.log(ctx.req.file);  //从req里面拿 不是request
    ctx.response.body= 'success'
})



app.use(uploadRouter.routes())
app.listen(8000,()=>{...})