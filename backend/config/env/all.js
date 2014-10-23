var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 8001,
	db: process.env.MONGOHQ_URL
}
