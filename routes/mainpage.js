/**
 * Created by Arun on 2/8/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('homepage', {username: req.session.uname});
});

router.get('/download', function(req, res){
    //console.log(res.body);
    console.log("Downloading...");
    res.download("./template-folder/attendance_template.xlsx", "attendance_template.xlsx");
    console.log("...Downloaded!");
    //res.end();   automatically called by res.download()
});

router.get('/2', function (req, res) {
    res.render('uploadExcel');
});

router.get('/profile', function (req, res) {
    res.render('profile');
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    console.log("session destroyed");
    res.redirect('/');
});

module.exports = router;