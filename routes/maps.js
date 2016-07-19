/**
 * Created by riku_maehara on 2016/07/17.
 */

var express = require('express');
var bodyParser = require('body-parser');
var connection = require('../util/mysql_util');

var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

/**
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

    var query1 = `insert into circles(user_id,title,content,radius,to_move,latlng) values(${userId},\"${title}\",\"${content}\",3,200,GeomFromText(\'POINT(${lat} ${lng})\'));`;

    console.log(query);
    connection.query(query1, function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
    });
    console.log(req.get('content-type'));

    res.send("/posts!!");
});


/**
 * 周囲10kmの悩み取得
 */
router.get('/get_near/:lat/:lng', function (req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;

    var query1 = `SELECT users.name ,users.user_id,circle_id,title,content,radius,to_move,help_count,view_count,from_merge,draw,users.created_at,
     X(latlng) as lng, Y(latlng) as lat,
    GLength(GeomFromText(CONCAT(\'LineString(${lat} ${lng},\', X(latlng), \' \', Y(latlng),\')\'))) AS distance
    FROM circles 
    INNER JOIN users on users.user_id=circles.user_id
    HAVING distance <= 0.0089831601679492
    ORDER BY distance;`;

    console.log(query1);

    connection.query(query1, function (err, result, field) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        res.send(result);
    });

});

module.exports = router;