/**
 * Created by Arun on 3/11/2017.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    console.log("review");
    res.render('review');
});

module.exports = app;