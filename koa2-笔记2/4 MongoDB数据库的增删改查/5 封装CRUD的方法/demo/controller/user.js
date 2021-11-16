const {User} = require('../models')
const crud = require('./crudUtil')

//添加系统用户
const userAdd = async (ctx) => {
  let {username = '',pwd = ''} = ctx.request.body
  await crud.add(User,{username,pwd},ctx)
}

//修改用户
const userUpdate = async (ctx) => {
    let params = ctx.request.body
    await crud.update(
            User,
            {_id:params._id},
            {username:params.username,pwd:params.pwd},
            ctx
        )
}

//删除用户
const userDel = async (ctx) => {
    let {_id} = ctx.request.body
    await crud.del(User,{_id},ctx)
}

//查询所有用户
const userFind = async (ctx) => {
    await crud.find(User,null,ctx)
}

//查询单个用户
const userFindOne = async (ctx) => {
    await crud.findOne(User,{_id:ctx.params.id},ctx)
}

module.exports = {
    userAdd,
    userUpdate,
    userDel,
    userFind,
    userFindOne
}