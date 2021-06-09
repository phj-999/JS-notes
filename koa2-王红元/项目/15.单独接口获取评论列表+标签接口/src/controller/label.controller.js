
const service = require('../service/label.service');

class LabelController {

    async create (ctx, next) {

        const {name} = ctx.request.body

        const result = await service.create
        ctx.body = '创建标签成功'

    }
    
}

module.exports = new LabelController()