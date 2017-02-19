/**
 * Created by Arun on 2/8/2017.
 */
var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const secret = "ridethebull";

/*router.get('/', function (req, res) {
    res.render('registration');
});

router.get('/success', function (req, res) {
    res.render('successReg');
});*/

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('registration');
});

/*app.get('/successpage', function (req, res) {
    res.render('successReg');
});*/

app.post('/success', function (req, res) {
    var db = req.con;

    /*db.query('SELECT uid FROM users', function (err, rows) {
        if(err) console.log(err);
        else {
            for(var i in rows)
                console.log(rows[i].uid);
        }
    });*/

    var passwd_hash = crypto.createHmac('sha256', secret).update(req.body.password).digest('hex');

    var data = {username:req.body.name, uid:req.body.UID, sem:req.body.semester, email:req.body.em,
        password:passwd_hash};

    db.query('INSERT INTO users SET ?', data, function (err) {
        if(err){
            res.send("Could not add info to database. Please try again.");
        }
        else {
            console.log("Tuple added");
            res.render('successReg');
        }
    });

    console.log(req.body.name);
    console.log(req.body.UID);
    console.log(req.body.semester);
    console.log(req.body.em);
    console.log(passwd_hash);
});

module.exports = app;