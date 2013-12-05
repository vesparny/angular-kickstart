var mongoose = require('mongoose'),
  Note = mongoose.model('Note'),
  _ = require('underscore');


exports.create = function(req, res, next) {
  var note = new Note(req.body);
  note.save(function(err) {
    if (err) {
      next();
    } else {
      res.json(note);
    }
  });
};


exports.update = function(req, res) {
  var id = req.params.id;
  Note.update({
    '_id': id
  }, req.body, function(err) {
    res.json(req.body);
  });
};


exports.destroy = function(req, res, next) {
  var id = req.params.id;
  var note = new Note({
    '_id': id
  });
  note.remove(function(err) {
    if (err) {
      next();
    } else {
      res.json(note);
    }
  });
};

exports.all = function(req, res) {
  Note.find().sort('created').exec(function(err, note) {
    if (err) {
      next();
    } else {
      res.json(note);
    }
  });
};
