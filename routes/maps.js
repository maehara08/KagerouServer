/**
 * Created by riku_maehara on 2016/07/17.
 */

var express = require('express');
var bodyParser = require('body-parser');
var connection = require('../util/mysql_util');

var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

/*
 * 悩み投稿API
 *
 */
router.post(('/add_circle'), function (req, res) {
    var requestBody = req.body;
    console.log(requestBody);

    var userId = requestBody.user_id;
    var title = requestBody.title;
    var content = requestBody.content;
    var lat = requestBody.latitude;
    var lng = requestBody.longitude;

    var query = `insert into circles(user_id,title,content,radius,to_move,latlng) values(${userId},\"${title}\",\"${content}\",3,200,GeomFromText(\'POINT(${lat} ${lng})\'));`;

    console.log(query);
    connection.query(query, function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
    });
    console.log(req.get('content-type'));

    res.send("/posts!!");
});


module.exports = router;