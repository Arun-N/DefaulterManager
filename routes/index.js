var express = require('express');
var router = express.Router();
var app = express();
var crypto = require('crypto');
const secret = "ridethebull";

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('login');
});

app.post('/validate', function (req, res) {
    var uname = req.body.LoginName;
    var pwd = req.body.LoginPassword;

    var pwdH = crypto.createHmac('sha256', secret).update(pwd).digest('hex');

    var db = req.con;
    db.query("SELECT password FROM users WHERE username='" + uname + "'", function (err, rows) {
        if(err){console.log(err)}
        else {
            console.log(rows[0]);
            if(rows[0] == undefined){
                console.log("Incorrect user name or password!");
                //window.alert("Incorrect user name or password!");
                res.redirect('/');
            }
            else {
                var pwdH2 = rows[0].password;
                if(pwdH == pwdH2){
                    console.log("Correct");
                    res.redirect('homepage');
                }
            }
        }
    });

});

app.get('/add', function(req, res, next) {
    var db = req.con;
    /*var data = {username:"Arun Nair", uid:"8080", sem:6, email:"appuarunnair@gmail.com", password:"212bfoi41"};
    db.query('INSERT INTO users SET ?', data, function (err) {
        if(err)
            console.log(err);
        else console.log("Tuple added");
    });*/

    db.query('SELECT password FROM users WHERE username="Arun"', function (err, rows) {
        if(err) console.log(err);
        else {
            console.log(rows[0]);
            if(rows[0] == undefined){
                console.log("Incorrect user name or password!");
            }
            else {
                var pwd = rows[0].password;
                console.log("Correct");
            }
        }
    });
    res.end();
});

module.exports = app;
