
const Koa = require('koa');
const serve = require('koa-static');
const convert = require('koa-convert')
const app = new Koa()
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
app.keys = ['awayismatch'];

app.use(convert(session({
    store: redisStore()
})));

// body parser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// authentication
require('./auth')
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

const webRouter = require('./routers/web')
const sWebRouter = require('./routers/securedWeb')
app.use(convert(sWebRouter.routes())).use(convert(sWebRouter.allowedMethods()))
app.use(convert(webRouter.routes())).use(convert(webRouter.allowedMethods()))
app.use(serve(__dirname + '/static'));

app.listen(3000);