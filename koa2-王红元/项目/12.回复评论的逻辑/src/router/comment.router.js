const Router = require('koa-router');

const commentRouter = new Router({prefix:'/comment'});

const {
    verifyAuth
} = require('../middleware/auth.middleware');

const {
    create
} = require('../controller/comment.controller.js');



//有权限（登录了）才能评论
commentRouter.post('/',verifyAuth,create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)




module.exports=commentRouter