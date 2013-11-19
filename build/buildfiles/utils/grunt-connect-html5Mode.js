var fs = require('fs'),
	url = require('url');

module.exports = function(rootDir) {
	var indexFile = "index.html"
	return function(req, res, next) {
		var path = url.parse(req.url).pathname;

		fs.readFile('./' + rootDir + path, function(err, buf) {
			if (!err) return next();

			fs.readFile('./' + rootDir + '/' + indexFile, function(err, buffer) {
				if (err) return next(err);

				resp = {
					headers: {
						'Content-Type': 'text/html'
					},
					body: buffer
				};
				res.writeHead(200, resp.headers);
				res.end(resp.body);
			});
		});
	}
};
