var express = require('express'),
  fs = require('fs');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  config = require('./config/config'),
  mongoose = require('mongoose');

var db = mongoose.connect(config.db);

var models_path = __dirname + '/app/models';
var walk = function(path) {
  fs.readdirSync(path).forEach(function(file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js$)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(models_path);


var app = express();

//express settings
require('./config/express')(app, db);

//bootstrap routes
require('./config/routes')(app);


var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

//expose app
exports = module.exports = app;
