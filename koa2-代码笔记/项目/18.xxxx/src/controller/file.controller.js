const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { AVATAR_PATH } = require('../constants/file-path')
const {APP_PORT,APP_HOST} = require('../app/config');

class FileController {
    async saveAvatarInfo (ctx, next) {
        //获取图片的相关信息
        const {mimetype, filename, size} = ctx.req.file

        const {id} = ctx.user

        //将图像信息数据保存到数据库中
        const result = await fileService.createAvatar (filename, mimetype, size, id)

        //将图片地址保存在user表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`

        await userService.updateAvatarUrlById(avatarUrl,id)

        //返回结果
        ctx.body = {
            message:'上传图像成功',

            statecode:111,
            
            result
        }

    }
}

module.exports = new FileController ()