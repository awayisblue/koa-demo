const Koa = require('koa');
const mount = require('koa-mount')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const api = new Koa()

require('koa-qs')(app, 'first') //parse query string in ctx.query
app.use(json())  //response pretty json formate by assign object to ctx.body
app.use(bodyParser()) //parse http body to ctx.request.body
app.use(mount('/v1',api))
//static files
require('./routers/web')(app)
require('./routers/api/v1')(api)
app.listen(8080);
console.log('http://localhost:8080')