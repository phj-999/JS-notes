const service = require('../service/user.service');

class UserController {
    async create(ctx, next) {

        const user = ctx.request.body //已经啊装了bodyparser 也注册了 这里可以直接借用这个来拿数据


        //写具体逻辑  可以把对数据的处理抽取到service里面
        const result = await service.create(user)

        ctx.body = result
    }
}

module.exports = new UserController()