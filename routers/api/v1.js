const router = require('koa-router')();
const controller = require('../../controllers/api/v1')
const authMiddleware = require('../../middlewares/auth')
function registerRoutes(router){
    router.use(authMiddleware)
    // console.log(controller.index)
    router.get('/demos',controller.demo)
    router.get('/error',controller.error)
}


module.exports = function(app){
    registerRoutes(router)
    app.use(router.routes()).use(router.allowedMethods())
}