'use strict';

var grunt = require('grunt');

module.exports = {
	package: {
		pkg: grunt.file.readJSON('package.json')
	},
	configuration: {
		config: require('./config')
	},
	external: require('./external-tasks')
};
