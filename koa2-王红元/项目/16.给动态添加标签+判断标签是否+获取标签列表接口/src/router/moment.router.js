const Router = require('koa-router');

const momentRouter = new Router({
    prefix: '/moment'
});

const {
    create,
    detail,
    update,
    remove,
    addLabels
} = require('../controller/moment.controller.js');

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware');


momentRouter.post('/', verifyAuth, create)

momentRouter.get('/:momentId', detail)

//1.用户必须登录 
//2.用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)

//删除功能
momentRouter.delete('/:momentId', verifyAuth,verifyPermission,remove)

//给动态添加标签
momentRouter.post ('/:momentId/labels', verifyAuth, verifyPermission, addLabels)

module.exports = momentRouter