const koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const app = new koa();

const testRouter = new Router()

const SERCET_KEY = 'ABC123' //必须设置 因为是hs256算法对称加密 所以需要一个密钥来加密解密
testRouter.get('/test', (ctx,next) => {
    const user = {id:110,name:'why'}
    const token = jwt.sign(user,SERCET_KEY,{
        expiresIn:10*1000     // 单位是秒
    })
   
 ctx.body = token   //返回token
})

//验证接口
testRouter.get('/demo',(ctx,next)=>{

    console.log(ctx.headers);
    const authorization = ctx.headers.authorization  //拿到token


    const token = authorization.replace('Bearer','')  //单独取出来token

  try {
    const result = jwt.verify(token,SERCET_KEY)
    ctx.body=result
  } catch (error) {
      ctx.body='token无效哦'  //token有设置过期时间
  }
})

//POSTMAN验证  localhost:3000/demo

app.use(testRouter.routes())
app.use(testRouter.allowedMethods())

app.listen(8000,()=>{
    console.log('启动成功');
})