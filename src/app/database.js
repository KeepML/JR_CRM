const mysql = require('mysql2');

const config = require('../app/config');
// console.log(config);
const connection = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
});


connection.getConnection((err,conn) => {
    if(!conn) {
        console.log("连接数据库失败~");
        return;
    }
    
    conn.connect((err) => {
        if(err){
            console.log("连接失败：",err);
        }else{
            console.log("数据库连接成功~");
        }
    })
})


module.exports = connection.promise();

