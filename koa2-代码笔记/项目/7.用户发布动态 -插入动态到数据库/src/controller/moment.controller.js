const momentService = require('../service/moment.service');


class MomentController {
    async create(ctx, next) {
        console.log('用户发布动态');
        //1.获取数据（user_id,content）

        const userId = ctx.user.id

        const content = ctx.request.body

        //2.将数据插入到数据库中

        const result = await momentService.create(userId,content)

        ctx.body = result
    }
}


module.exports = new MomentController()