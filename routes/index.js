var express = require('express');
var router = express.Router();


var pjson = require('../package.json'); // Access to package/app info.
var fs = require('fs');
var path = require('path');

var formidable = require('formidable'); // Form validation and handling

var parentDir = path.resolve(__dirname + '/..');


// Get main
// Todo: this should probably redirect somewhere in the future
router.get('/', function (req, res){
  return res.render('index', {version: pjson.version, name: pjson["name"]});
});

router.get('/login', function (req, res){
  return res.render('paths/login', {version: pjson.version, name: pjson["name"]});
});

router.get('/getfile', function (req, res){
  res.sendFile(parentDir + '/uploads/' + req.query.fileName);
});


module.exports = router;
