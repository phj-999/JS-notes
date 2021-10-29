const koa = require('koa');

const app = new koa();

const bodyparser = require('koa-bodyparser');


const useRoutes = require('../router/index');

const errorhandle = require('./error-handle')

app.use(bodyparser())

useRoutes(app)

app.on('error',errorhandle)

module.exports = app