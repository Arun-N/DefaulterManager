/**
 * Created by Arun on 2/10/2017.
 */
var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var busboy = require('connect-busboy');
var fs = require('fs');

/*busboy.extend(app, {

 });*/
app.use(busboy());
// default options
app.use(fileUpload());

app.post('/', function(req, res) {
    var templatefile;

    //console.log(req.files.selectedFile);

    if (!req.files) {
        console.log(req.body);
        //res.send('No files were uploaded.');
        console.log('No files were uploaded');
        return;
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    //sampleFile = req.files.SampleFile;
    templatefile = req.files.TemplateFile;

    //console.log("defaulter : " + sampleFile.name);
    console.log("template : " + templatefile.name);
    //console.log(req.body.sem_dd);

    // Use the mv() method to place the file somewhere on your server

    templatefile.mv(templatefile.name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            var db = req.con;

            //res.send('File uploaded!');
            console.log('Template File uploaded!');
            //newfile = req.body.sem_dd + sampleFile.name;
            fs.rename("./" + templatefile.name, "./upload-folder/" + templatefile.name, function (err) {
                if(err){
                    console.log(err);
                    res.status(500).send(err)
                }
            });
            db.query("SELECT files FROM users WHERE username='" + req.session.uname + "'", function (err, rows) {
                if (err){
                    console.log(err);
                }
                else {
                    //console.log("value = " + rows[0].files);
                    if(rows[0].files == null){
                        db.query("UPDATE users SET files='" + templatefile.name + "' WHERE username='" + req.session.uname + "'", function (err) {
                            if(err){
                                console.log(err);
                            }
                            else {
                                console.log("Updated successfully!");
                            }
                        });
                    }
                    else {
                        var file_arr = rows[0].files.split(",");
                        file_arr.push(templatefile.name);
                        var filename_string = file_arr.join(",");
                        db.query("UPDATE users SET files='" + filename_string + "' WHERE username='" + req.session.uname + "'", function (err) {
                            if(err){
                                console.log(err);
                            }
                            else {
                                console.log("Updated successfully!");
                            }
                        });
                    }
                }
            })
        }
    });
    res.send({redirect: '/listreview'});
});


module.exports = app;

//TODO: redirect not working