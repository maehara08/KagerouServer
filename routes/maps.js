/**
 * Created by riku_maehara on 2016/07/17.
 */

var express=require('express');
var bodyParser = require('body-parser');
var connection = require('../util/mysql_util');

var router=express.Router();

router.use(bodyParser.urlencoded({extended: false}));

/*
* 悩み投稿API
*
 */
router.post(('/signup'), function (req, res) {
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



module.exports=router;