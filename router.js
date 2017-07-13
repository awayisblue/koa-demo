const router = require('koa-router')();
const controller = require('./controller')
function registerRoutes(router){
    router.get('/',controller.index)
    router.get('/json',controller.json)
}


module.exports = function(app){
    registerRoutes(router)
    app.use(router.routes()).use(router.allowedMethods())
}