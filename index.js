
const Koa = require('koa');
const serve = require('koa-static');
const convert = require('koa-convert')
const app = new Koa()

const webRouter = require('./routers/web')

app.use(convert(webRouter.routes()))
    .use(convert(webRouter.allowedMethods()))
    .use(serve(__dirname + '/static'));

app.listen(3000);