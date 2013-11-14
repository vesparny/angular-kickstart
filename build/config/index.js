'use strict';

var grunt = require('grunt');

module.exports = {
	package: {
		pkg: grunt.file.readJSON('package.json')
	},
	configuration: {
		config: require('./config')
	},
	development: require('./task/development'),
	build: require('./task/build'),
	release: require('./task/release')
};
