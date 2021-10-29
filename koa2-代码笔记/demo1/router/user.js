const Router = require('koa-router');

const router = new Router({prefix:'/users'});

router.get('/',(ctx,next)=>{
    ctx.response.body = 'USER lists'
})
router.put('/',(ctx,next)=>{
    ctx.response.body = 'USER lists'
})

module.exports = router