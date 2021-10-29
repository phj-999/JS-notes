const Router = require('koa-router');

const fileRouter = new Router({
    prefix: '/upload'
});

const {
    avatarHandler
} = require('../middleware/file.middleware')

const {
    verifyAuth
} = require('../middleware/auth.middleware')

const {
    saveAvatarInfo
} = require ('../controller/file.controller')

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)

module.exports = fileRouter