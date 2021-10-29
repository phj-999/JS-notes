const koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const app = new koa();

const testRouter = new Router()



const PRIVATE_KEY = fs.readFileSync('./keys/private.key')
const PUBLIC_KEY =  fs.readFileSync('./keys/public.key')   //传递来的都是buffer

testRouter.get('/test', (ctx,next) => {
    const user = {id:110,name:'why'}
    const token = jwt.sign(user,PRIVATE_KEY,{
        expiresIn:10*1000 ,    // 单位是秒
        algorithm: 'RS256'  //默认是hs256算法  这里用的是非对称加密 所以要指定RS256的算法
    })
   
 ctx.body = token   //返回token
})

//验证接口
testRouter.get('/demo',(ctx,next)=>{

    console.log(ctx.headers);
    const authorization = ctx.headers.authorization

    const token = authorization.replace('Bearer','')

  try {
    const result = jwt.verify(token,PUBLIC_KEY,{
        algorithms:['RS256']
    })
    ctx.body=result
  } catch (error) {
      console.log(error,message);
      ctx.body='token无效哦'  //token有设置过期时间
  }
})

app.use(testRouter.routes())
app.use(testRouter.allowedMethods())

app.listen(8000,()=>{
    console.log('启动成功');
})