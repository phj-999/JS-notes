const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const fs =require('fs')
const { AVATAR_PATH} = require('../constants/file-path');

class UserController {
    async create(ctx, next) {

        const user = ctx.request.body //已经啊装了bodyparser 也注册了 这里可以直接借用这个来拿数据


        //写具体逻辑  可以把对数据的处理抽取到service里面
        const result = await userService.create(user)

        ctx.body = result
    }

    async avatarInfo (ctx, next) {
        //用户图像是哪啊一个文件呢
        const {userId} = ctx.params

        const avatarInfo = await fileService.getAvatarByUserId (userId)


        //提供图片信息
        ctx.response.set('content-type',avatarInfo.mimetype) //指定是图片 无此行代码则请求接口时候直接会下载图片下来

        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)

    }
}

module.exports = new UserController()