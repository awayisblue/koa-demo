const demoDb = require('../../database/demo')
const jsonResponse = require('../../libs/jsonResponse')
module.exports.demo = async function(ctx){
    //处理业务逻辑，比如说从数据库里拿数据等
    jsonResponse.success(ctx)
}

module.exports.error = async function(ctx){
    //当测试使用，返回错误
    jsonResponse.fail(ctx,'1000')
}