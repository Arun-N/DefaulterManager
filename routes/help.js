/**
 * Created by Arun on 2/22/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render("help");
    //res.send("help")
});

module.exports = router;