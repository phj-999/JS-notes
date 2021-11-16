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

//修改系统用户
router.post('/update', async (ctx) => {
	let params = ctx.request.body
	await User.updateOne(
		{_id: params._id},
		{username: params.username,pwd: params.pwd}
		).then(rel => {
        ctx.body = {
            reslut: rel
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '修改时出现异常'
        }
        console.error(err)
    })
})

//删除系统用户
router.post('/del', async (ctx) => {
	let {_id} = ctx.request.body
	await User.findOneAndDelete({_id}).then(rel => {
        ctx.body = {
            reslut: rel
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '删除时出现异常'
        }
        console.error(err)
    })
})

//查询所有系统用户
router.get('/find', async (ctx) => {
	await User.find().then(rel => {
        ctx.body = {
            result: rel
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '查询时出现异常'
        }
        console.error(err)
    })
})

//查询单个系统用户
router.get('/find/:id', async (ctx) => {
	await User.findOne({_id: ctx.params.id}).then(rel => {
        ctx.body = {
            result: rel
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '查询时出现异常'
        }
        console.error(err)
    })
})

module.exports = router
