//Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = [];
var commentPath = path.join(__dirname, 'comments.json');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Read comments from comments.json
fs.readFile(commentPath, function(err, data) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  comments = JSON.parse(data);
});

//Add comments to comments.json
app.post('/api/comments', function(req, res) {
  var newComment = {
    id: Date.now(),