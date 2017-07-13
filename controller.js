const render = require('./lib/render')

module.exports.index = async function(ctx){
    let nowDate = new Date()
    let time = nowDate.getHours()+':'+nowDate.getMinutes()+':'+nowDate.getSeconds()
	ctx.body = await render('index.ejs',{time})
}

module.exports.json = async function(ctx){
    let nowDate = new Date()
    let time = nowDate.getHours()+':'+nowDate.getMinutes()+':'+nowDate.getSeconds()
    let query = ctx.query
    ctx.body = {time,query}
}
