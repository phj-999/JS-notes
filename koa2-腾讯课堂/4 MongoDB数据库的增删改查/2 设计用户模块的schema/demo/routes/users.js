const router = require('koa-router')()
const {User} = require('../models')
router.prefix('/users')

//添加系统用户
router.post('/add', async (ctx) => {
	let {username = '',pwd = ''} = ctx.request.body
	await User.create({username,pwd}).then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: rel
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '添加失败'
            }
        }

    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '添加时出现异常'
        }
        console.error(err)
    })
	
})


module.exports = router
