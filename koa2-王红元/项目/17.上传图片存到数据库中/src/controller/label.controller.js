
const service = require('../service/label.service');

class LabelController {

    async create (ctx, next) {

        const {name} = ctx.request.body

        const result = await service.create
        ctx.body = '创建标签成功'

    }

    async list (ctx, next) {
        const {limit, offset} = ctx.query

        const [result] = await service.getLabels (limit, offset)

        ctx.body =  result[0]
    }

}

module.exports = new LabelController()