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

    var name = requestBody.name;
    var title = requestBody.title;
    var content = requestBody.content;
    var lat = requestBody.latitude;
    var lng = requestBody.longitude;
    var randLat = oneKiroLatDegree * Math.random() * 31 / 10;
    var randLng = oneKiroLngDegree * Math.random() * 31 / 10;

    var query1 = `insert into circles(name,title,content,radius,move_to,latlng)
    values(\"${name}\",\"${title}\",\"${content}\",1,
    GeomFromText(\'POINT(${randLat} ${randLng})\'),
    GeomFromText(\'POINT(${lat} ${lng})\'));`;
    console.log(query1);

    connection.query(query1, function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);

            res.send('error');
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

    var query1 = `SELECT users.name ,users.user_id,circle_id,title,content,radius,X(move_to) as move_to_x, Y(move_to) as move_to_y,help_count,view_count,from_merge,draw,users.created_at,
     X(latlng) as lng, Y(latlng) as lat,
    GLength(GeomFromText(CONCAT(\'LineString(${lat} ${lng},\', X(latlng), \' \', Y(latlng),\')\'))) AS distance
    FROM circles
    INNER JOIN users on users.name=circles.name`;

    // var query1 = `SELECT users.name ,users.user_id,circle_id,title,content,radius,X(move_to) as move_to_x, Y(move_to) as move_to_y,help_count,view_count,from_merge,draw,users.created_at,
    //  X(latlng) as lng, Y(latlng) as lat,
    // GLength(GeomFromText(CONCAT(\'LineString(${lat} ${lng},\', X(latlng), \' \', Y(latlng),\')\'))) AS distance
    // FROM circles
    // INNER JOIN users on users.name=circles.name
    // HAVING distance <= 0.0089831601679492
    // ORDER BY distance;`;

    console.log(query1);

    connection.query(query1, function (err, result, field) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        res.send(result);
    });

});


/**
 * コメント取得する
 */

router.get('/get_comments',function (req, res) {
    var query='select * from comments;';
    console.log(query);

    connection.query(query,function (err, result, field) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(501);
            return;
        }
        res.send(result);
    })
});

/**
 * コメント投稿
 */

router.post('/add_comment', function (req, res) {
    var requestBody = req.body;
    var name = requestBody.name;
    var content = requestBody.content;
    var circleId = requestBody.circle_id;

    var query = `insert into comments(name,circle_id,content) values('${name}',${circleId},'${content}');`;
    console.log(query);

    connection.query(query, function (err, result, field) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        res.sendStatus(200);
    });

});

/**
 * 悩み解消
 * 悩み削除
 */

router.post('/my/circles/delete',function (req, res) {
    var requestBody = req.body;
    var name = requestBody.name;
    var circleId=requestBody.circle_id;

    var query = `delete from circles where circle_id=${circleId} and name="${name}";`;
    console.log(query);

    connection.query(query, function (err, result, field) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        res.sendStatus(200);
    });

});

/**
 * 円移動
 */
var POLE_RADIUS = 6356752.314;
var oneKiroLatDegree = ( 360 * 1000 ) / ( 2 * Math.PI * POLE_RADIUS );

var JAPAN_LATITUDE = 35;
var EQUATOR_RADIUS = 6378137;
var oneKiroLngDegree = ( 360 * 1000 ) / ( 2 * Math.PI * ( EQUATOR_RADIUS * Math.cos(JAPAN_LATITUDE * Math.PI / 180.0) ) );

function moveCircle() {
    var randLat = oneKiroLatDegree * Math.random() * 31 / 10;
    var randLng = oneKiroLngDegree * Math.random() * 31 / 10;


}


/**
 * 円移動を1秒ごとに実行
 */
var cronJob = require('cron').CronJob;
// 毎秒実行
var cronTime = "* * * * * *";

var job = new cronJob({
    //実行したい日時 or crontab書式
    cronTime: cronTime

    //指定時に実行したい関数
    , onTick: function () {
        console.log('onTick!');
    }

    //ジョブの完了または停止時に実行する関数
    , onComplete: function () {
        console.log('onComplete!')
    }

    // コンストラクタを終する前にジョブを開始するかどうか
    , start: false

    //タイムゾーン
    , timeZone: "Japan/Tokyo"
});

//ジョブ開始
// job.start();


module.exports = router;