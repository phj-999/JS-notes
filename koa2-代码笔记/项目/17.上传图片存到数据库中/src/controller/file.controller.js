const fileService = require('../service/file.service');

class FileController {
    async saveAvatarInfo (ctx, next) {
        //获取图片的相关信息
        const {mimetype, filename, size} = ctx.req.file

        const {id} = ctx.user

        //将图像信息数据保存到数据库中
        const result = await fileService.createAvatar (filename, mimetype, size, id)

        //返回结果
        ctx.body = result

    }
}

module.exports = new FileController ()