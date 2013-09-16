var nano = require('nano');
var express = require('express');

var app = express();
var studentplannerdb = nano('http://localhost:5984/studentplannerdb');

app.configure(function() {
  app.use(express.static('./public'));
  app.use(express.bodyParser());
});
//api
app.get('/api/classes', function(req, res) {
  res.send(200, 'here');
});
app.put('/api/add/class', function(req, res) {
  console.log(req.body);
  studentplannerdb.insert(req.body, function(err, body) {
    if(err) { res.send(500, err); }
    res.send(200);
  });
});
//resources
app.get('/app/templates/*', function(req, res) {
  res.sendfile(__dirname + req.url);
});

app.get('/*', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
app.listen(1337);
console.log('Listening on port 1337');
