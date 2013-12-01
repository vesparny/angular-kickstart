'use strict';

var _ = require('lodash'),
	moment = require('moment'),
	config = require('./build/build.config'),
	externalTasks = require('./build/buildfiles/external-tasks');


module.exports = function(grunt) {
	grunt.log.write('%s - Loading external tasks...', moment().format());

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.log.writeln('done');

	grunt.loadTasks('./build/buildfiles/tasks');
	grunt.initConfig(_.extend({
		config: config,
		pkg: grunt.file.readJSON('package.json')
	}, externalTasks(grunt)));

	grunt.registerTask('serve', [
		'build',
		'configureProxies',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean',
		'html2js',
		'concurrent:build',
		'copy:webappAssets',
		'tpl:build'
	]);

	grunt.registerTask('dist', [
		'jshint',
		'build',
		'karma:unit',
		'copy:distAssets',
		'ngmin',
		'concat',
		'cssmin',
		'uglify',
		'rev',
		'imagemin',
		'svgmin',
		'tpl:dist',
		'htmlmin',
		'configureProxies',
		'connect:dist:keepalive'
	]);

	grunt.registerTask('default', 'serve');
};
