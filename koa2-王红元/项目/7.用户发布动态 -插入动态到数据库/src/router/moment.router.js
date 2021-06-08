
const Router = require('koa-router');

const momentRouter = new Router ({prefix:'/moment'});

const {} = require('../controller/moment.controller.js');

const {verifyAuth} = require('../middleware/auth.middleware');


momentRouter.post('/', verifyAuth, create)


module.exports = momentRouter