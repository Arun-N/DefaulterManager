var express = require('express');
var app = express();
var crypto = require('crypto');
const secret = "ridethebull";
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('login');
});

app.post('/validate', function (req, res) {
    var uname = req.body.LoginName;
    var pwd = req.body.LoginPassword;

    var pwdH = crypto.createHmac('sha256', secret).update(pwd).digest('hex');

    var db = req.con;
    if(req.session.uname && req.session.uname != uname){
        setTimeout(function () {
            res.redirect('/');
        }, 5000);
        //res.send("You are already logged in with another account. Please log out of that account first.\nRedirecting in 5 sec...");

    }else{
        db.query("SELECT password FROM users WHERE username='" + uname + "'", function (err, rows) {
            if(err){console.log(err)}
            else {
                //console.log(rows[0]);
                if(rows[0] == undefined){
                    console.log("Incorrect user name!");
                    //res.writeHead(200, {"Content-Type":"text/plain"});
                    //res.end("wrong_username");
                    res.redirect('/');
                }
                else {
                    var pwdH2 = rows[0].password;
                    if(pwdH == pwdH2){
                        console.log("Correct");
                        //var cookie = req.cookies.userinfo;
                        if(!req.session.uname){
                            console.log("cookie not set");
                            req.session.uname = uname;
                            console.log("Cookie created!");
                        }
                        else {
                            console.log("Cookie and session exists");
                        }
                        res.redirect('homepage');
                    }
                    else {
                        console.log("password incorrect");
                        res.redirect('/');
                        //res.writeHead(200, {"Content-Type":"text/plain"});
                        //res.end("wrong_password");
                    }
                }
            }
        });
    }

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
