const Composer = require('mysql-composer')
const mysql = require('mysql')
const config = require('../config')
const connection = mysql.createConnection({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : 'demo',
    charset: 'utf8mb4'
});
const escape = connection.escape.bind(connection)
const composer = new Composer(connection)
module.exports.composer = composer

module.exports.getDemoById = async (id)=>{
    let sql = `select * from demo where id=${escape(id)}`
    return composer.query(sql)
}