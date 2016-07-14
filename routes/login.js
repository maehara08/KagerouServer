var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("This is login api!");
});

router.get('/signup', function (req, res, next) {
    res.send("This is sign up page");
});

router.get('/signin', function (req, res, next) {
    res.send("This is sign in page!!!")

});

module.exports = router;
