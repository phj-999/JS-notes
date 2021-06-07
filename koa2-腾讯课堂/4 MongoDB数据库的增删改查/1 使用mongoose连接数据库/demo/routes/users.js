const router = require('koa-router')()
router.prefix('/users')

router.get('/', async (ctx, next) => {
  ctx.body = 'users routers...'
})

module.exports = router
