const  config  = require('./src/app/config');
const app = require('./src/app')

app.listen(config.App_port,()=>{
    console.log('服务器启动成功');
})