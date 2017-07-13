const Koa = require('koa');
const serve = require('koa-static')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const staticMountPoint = new Koa()

require('koa-qs')(app, 'first') //parse query string in ctx.query
app.use(json())  //response pretty json formate by assign object to ctx.body
app.use(bodyParser()) //parse http body to ctx.request.body

//static files
staticMountPoint.use(serve('./static',{maxage:60 * 60 * 24 * 365}))
app.use(mount('/static',staticMountPoint))
require('./router')(app)
app.listen(8080);
console.log('http://localhost:8080')