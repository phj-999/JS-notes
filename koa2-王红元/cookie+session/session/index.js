const koa = require('koa');
const Router = require('koa-router');
 
const Session = require('koa-session');

const app = new koa();

const testRouter = new Router()

创建session配置
const session = Session({
    key: 'sessionid',
    maxAge: 10*1000,
    signed: true   //签名是为了防止客户端伪造，默认值true  可设置为true
},app)
app.use(session)

//假如是一个登录接口
testRouter.get('/test', (ctx,next) => {  
 
  const id =110
  const name ='coderwhy'
  ctx.session.user ={id,name}
  ctx.body='session设置成功'
  
})

testRouter.get('/demo',(ctx,next)=>{
  console.log(ctx.session.user);      //拿到/test中的session
})

app.use(testRouter.routes())
app.use(testRouter.allowedMethods())

app.listen(8000,()=>{
    console.log('启动成功');
})