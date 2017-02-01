/**
 * Created by Arun on 2/1/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    console.log("Downloading...");
    res.download("./upload-folder/attendance_template.xlsx", "attendance_template.xlsx");
    console.log("...Downloaded!");
    //res.end();   automatically called by res.download()
});

module.exports = router;