module.exports = function(app) {
  var config = require('./../config/config');

  function createRoute(base) {
    return config.apiUrl + base;
  }
  var notes = require('../app/controllers/notes');
  app.get(createRoute('/notes'), notes.all);
  app.post(createRoute('/notes'), notes.create);
  app.post(createRoute('/notes/:id'), notes.update);
  app.delete(createRoute('/notes/:id'), notes.destroy);
};
