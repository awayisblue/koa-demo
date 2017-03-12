/**
 * Created by awayisblue on 2017/3/12.
 */
const router = require('koa-router')();
const render = require('../lib/render')

router.get('/', function *(next) {
    this.body = yield render('index')
});
module.exports = router