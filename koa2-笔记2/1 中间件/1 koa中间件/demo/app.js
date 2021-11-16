const koa = require('koa')

const app = new koa()

app.use(async (ctx,next) => {
    console.log('1')
    await next()
    console.log('1-1')
    ctx.body = 'hello world'
})

app.use(async (ctx,next) => {
    console.log('2')
    await next()
    console.log('2-1')
})

app.use((ctx) => {
    console.log('3')
})

app.listen(3000)