const router = require('koa-router')();
const controller = require('../controllers/web')
function registerRoutes(router){
    router.get('/',controller.index)
}


module.exports = function(app){
    registerRoutes(router)
    app.use(router.routes()).use(router.allowedMethods())
}