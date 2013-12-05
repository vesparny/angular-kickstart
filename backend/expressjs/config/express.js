var express = require('express'),
  config = require('./config'),
  cors = require('./../config/middlewares/cors');

module.exports = function(app, db) {
  app.set('showStackError', true);

  app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(cors);
    app.use(app.router);

    //404
    app.use(function(err, req, res, next) {
      //Treat as 404
      if (~err.message.indexOf('not found')) return next();

      //Log it
      console.error(err.stack);

      //Error page
      res.status(500).send('500', {
        error: err.stack
      });
    });

    //Assume 404 since no middleware responded
    app.use(function(req, res, next) {
      res.status(404).send('404', {
        url: req.originalUrl,
        error: 'Not found'
      });
    });

  });
};
