/**
 * Created by riku_maehara on 2016/07/14.
 */
var　mysql=require('mysql');

var connection=mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'csdevelopers',
    database: 'kagerou'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;