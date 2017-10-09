const render = require('../libs/render')

module.exports.index = async function(ctx){
	ctx.body = await render('index.ejs')
}