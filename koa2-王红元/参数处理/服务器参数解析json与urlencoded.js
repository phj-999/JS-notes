/**
 * @params json 与 urlencoded
 * 
 * postman传入 {
 *   title：'huawei'
 *  price:8888888        
 *   }
 */


 const bodyParser = require('body-parser');
const koa = require('koa');
 
 const app = new koa()
 
 app.use(bodyParser())  //此处只是笔记 并未安装

 app.use((ctx,next)=>{
     console.log(ctx.request.body);    //  未安装和注册koa-bodyparser前k返回undefined
     ctx.response.body = 'Hello World'
 })

//在express中有个中间件  app.use(express.json())会解析body的数据  但是koa中没有 至少此版本中没有

//所以要安装第三方库 koa-bodyparser  解析传来的json和urlencoded数据 放在前面注册 中间件顺序 


/**
 * @params 再次测试  poatman-body 传入body数据 formdata  解析不了  express中也是
 * 需要安装第三方库multer  koa中是koa-multer
 */

app.use(upload.any())//解析任何form-data的数据类型
// 但不建议这么写
//真是开发中可以这样写
//路由中可以连续注册中间件
Router.post('login',upload.any(),(ctx,next)=>{...})

 app.listen(8000, () => {
     console.log('路由启动成功');
 })