var app = require('./app');

app.listen(process.env.PORT || 8000);
if(process.env.PORT) {
  console.log('Express listening on port ' + process.env.PORT);
} else {
  console.log('Express listening on port 8000');
}