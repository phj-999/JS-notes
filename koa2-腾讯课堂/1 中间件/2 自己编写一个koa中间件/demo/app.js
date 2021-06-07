const koa = require('koa')

const app = new koa()

app.use(async (ctx) => {
    if(ctx.url === '/'){
    	console.log('这是首页');
    }else if(ctx.url === '/user'){
    	if(ctx.method === 'GET'){
    		console.log('这是用户列表页');
    	}else if(ctx.method === 'POST'){
    		console.log('添加用户');
    	}
    }else{
    	ctx.status = 404
    }
})

app.listen(3000)