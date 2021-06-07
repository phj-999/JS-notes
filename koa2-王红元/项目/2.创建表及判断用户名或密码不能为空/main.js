const  config  = require('./src/app/config');
const app = require('./src/app')

app.listen(config.App_port, () => {

    console.log(`服务器在${config.App_port}端口启动成功`);
    
    }
)