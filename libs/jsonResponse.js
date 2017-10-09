const errorCodes = require('./errorCodes')
module.exports.success = (ctx,payload={},messages=[])=>{
    ctx.body = {
        err_code:0,
        err_msg:'',
        messages:messages,
        payload:payload
    }
}
module.exports.fail = (ctx,code,payload={},messages=[])=>{
    let obj = errorCodes[code]
    if(!obj)throw '错误码未定义'
    ctx.status = obj.httpCode
    ctx.body = {
        err_code:code,
        err_msg:obj.message,
        messages:messages,
        payload:payload
    }
}