//db.js
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '10.10.17.144',
    user: 'root',
    port:'3306',
    password: 'long902323',
    database: 'mydata'
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;