module.exports = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};
