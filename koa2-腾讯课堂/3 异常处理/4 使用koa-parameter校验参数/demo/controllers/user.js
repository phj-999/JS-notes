let userList = [{username:'tom',pwd:'123'}]

//添加用户
const add = async (ctx) => {
    ctx.verifyParams({
        username: {
            type: 'string',
            required: true
        },
        pwd: {
            type: 'string',
            required: true
        }
    })
    let {username,pwd} = ctx.request.body
	userList.push({
		username,
		pwd
	})
	ctx.body = {
		code: 200,
		msg: '添加成功'
	}
}

//修改用户
const update = async (ctx) => {
    let user = ctx.request.body
	userList.splice(Number(user.id),1,{
		username: user.username,
		pwd: user.pwd
	})
	ctx.body = {
		code: 200,
		msg: '修改成功'
	}
}

//删除用户
const del = async (ctx) => {
    let {id} = ctx.request.body
	userList.splice(Number(id),1)
	ctx.body = {
		code: 200,
		msg: '删除成功'
	}
}

//查询所有用户
const find = async (ctx) => {
    ctx.body = {
		data: userList
	}
}

//查询单个用户
const findOne = async (ctx) => {
    let id = ctx.params.id
    
    if(Number(id) > (userList.length - 1)){
        ctx.throw(412,'先决条件失败')
    }

	ctx.body = {
		code: 200,
		user: userList[Number(id)]
	}
}

module.exports = {
    add,
    update,
    del,
    findOne,
    find
}