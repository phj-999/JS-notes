const {User} = require('../models')
const crud = require('./crudUtil')

//添加系统用户
const userAdd = async (ctx) => {
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
}

//修改用户
const userUpdate = async (ctx) => {
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
}

//删除用户
const userDel = async (ctx) => {
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
}

//查询所有用户
const userFind = async (ctx) => {
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
}

//查询单个用户
const userFindOne = async (ctx) => {
    await User.findOne({_id:ctx.params.id}).then(rel => {
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
}

module.exports = {
    userAdd,
    userUpdate,
    userDel,
    userFind,
    userFindOne
}