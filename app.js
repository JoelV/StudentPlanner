var nano = require('nano');
var express = require('express');
var _ = require('underscore');
var config = require('./config.js');

var app = express();
var server = require('http').createServer(app);
var studentplannerdb = nano(config.COUCHDB);

app.configure(function() {
  app.use(express.static('./public'));
  app.use(express.bodyParser());
});
//api
app.get('/api/classes', function(req, res) {
  res.send(200, 'here');
});

app.put('/api/add/class', function(req, res) {
  studentplannerdb.insert(req.body).pipe(res);
});

app.put('/api/assignment/add', function(req, res) {
  studentplannerdb.insert(req.body).pipe(res);
});

app.get('/api/course/list', function(req, res) {
  studentplannerdb.view('classList', 'all', function(err, body) {
    if(err) { res.send(500, err); }
    res.send(200, _.pluck(body.rows,'value'));
  });
});

app.del('/api/course/delete/:id', function(req, res) {
  studentplannerdb.destroy(req.params.id, req.query.rev).pipe(res); 
});

app.get('/api/assignment/list/:className', function(req, res) {
  studentplannerdb.view('assignment', 'all', function(err, body){
    if(err) { res.send(500, err); }
    res.send(200, _.chain(body.rows).where({key: req.params.className}).pluck('value').value());
  });
});

app.get('/api/assignments/all', function(req, res) {
  studentplannerdb.view('assignment', 'all').pipe(res);
});

app.del('/api/assignment/delete/:id', function(req, res) {
  studentplannerdb.destroy(req.params.id, req.query.rev).pipe(res);
});
app.put('/api/assignment/edit', function(req, res) {
  studentplannerdb.insert(req.body).pipe(res);
});
//resources
app.get('/app/templates/*', function(req, res) {
  res.sendfile(__dirname + req.url);
});

app.get('/*', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

exports = module.exports = server;

exports.use = function() {
  app.use.apply(app, arguments);
};
