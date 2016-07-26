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
router.post(('/signup'), function (req, res) {
    var requestBody = req.body;
    console.log('*/-------------------------------------');
    console.log("signup");
    console.log(requestBody);
    console.log("insert into users(name,password,sex,age) values(" + requestBody.name + "," + requestBody.password + "," + requestBody.sex + "," +
        requestBody.age + ")");

    connection.query("insert into users(name,password,sex,age) values(" + "\'" + requestBody.name +
        "\',\'" + requestBody.password + "\',\'" + requestBody.sex + "\',\'" + requestBody.age + "\')",
        function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                res.sendStatus(401).end();
                return;
            }
            res.sendStatus(200);
        });
    console.log(req.get('content-type'));
    console.log('-------------------------------------*/');
});

//ログイン
router.post('/signin', function (req, res) {
    console.log('*/-------------------------------------');
    var requestBody = req.body;
    console.log("signin");
    console.log(requestBody);
    connection.query('select * from users where name = \"' + requestBody.name + '\" and password = \"' + requestBody.password + '\"', function (err, result, fields) {
        console.log('select * from users where name = \"' + requestBody.name + '\" and password = \"' + requestBody.password + '\"');
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(401);
            return;
        } else if (result.length==0) {
            res.sendStatus(401)
        }
        else {
            res.sendStatus(200);
            console.log("result=" + result);
        }
    });
    console.log('-------------------------------------*/');
});

router.get('/signin', function (req, res, next) {
    res.send("This is sign in page!!!")

});

module.exports = router;
