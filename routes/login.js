var express = require('express');
var bodyParser = require('body-parser');
var connection = require('../util/mysql_util');

var router = express.Router();

/* GET home page. */
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function (req, res, next) {
    res.send("This is login api!");
});

router.get('/signup', function (req, res, next) {
    res.send("This is sign up page");
});

//新規登録
router.post(('/siginup'), function (req, res) {
    // connection.query("insert into posts(name,post,created) values('sato "+ req.params.version + "','" + req.params.version + "',\'2016-7-12 11:00:00\')",
    var requestBody = req.body;
    console.log(requestBody);
    console.log("insert into users(name,password,sex,age) values(" + requestBody.name + "," + requestBody.password + "," + requestBody.sex + "," +
        requestBody.age + ")");
    connection.query("insert into users(name,password,sex,age) values(" + "\'" + requestBody.name +
        "\',\'" + requestBody.password + "\',\'" + requestBody.sex + "\',\'" + requestBody.age + "\')",
        function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
            }
        });
    console.log(req.get('content-type'));

    res.send("/posts!!");
});

//ログイン
router.post('/signin', function (req, res) {
    connection.query('select from users', function (err, result, fields) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log(result);

    })

});

router.get('/signin', function (req, res, next) {
    res.send("This is sign in page!!!")

});

module.exports = router;
