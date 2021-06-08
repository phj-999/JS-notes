const momentRouter = require('../router/moment.router');
const momentService = require('../service/moment.service');


class MomentController {
    async create(ctx, next) {
        console.log('用户发布动态');
        //1.获取数据（user_id,content）

        const userId = ctx.user.id

        const content = ctx.request.body

        //2.将数据插入到数据库中

        const result = await momentService.create(userId, content)

        ctx.body = result

    }

    async detail(ctx, next) {
        //获取momentId

        const momentId = ctx.params.momentId

        //根据id去查询这条数据

        const result = await momentService.getMomentById(momentId)

        ctx.body = result

    }

    async list(ctx, next) {
        //获取数据(offset/size)
        const {
            offset,
            size
        } = ctx.query

        //查询列表
        const result = await momentService.getMomentList(offset, size)

        ctx.body = result

    }

    async update(ctx, next) {
        //获取参数
        const {
            momentId
        } = ctx.params

        const {
            content
        } = ctx.request.body

        //修改内容
        const result = await momentService.update(content, momentId)

        ctx.body = result

    }

    async remove (ctx,next) {
        //获取momentId
        const {momentId} = ctx.params
        
        //删除内容
        const result = await momentService.remove(momentId)

        ctx.body = result
    }
}


module.exports = new MomentController()