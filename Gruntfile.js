'use strict';

var _ = require('lodash'),
	config = require('./build/build.config'),
	externalTasks = require('./build/buildfiles/external-tasks');


module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.loadTasks('./build/buildfiles/tasks');
	require('time-grunt')(grunt);
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

	grunt.registerTask('unit', 'karma:unit');

	grunt.registerTask('default', 'serve');
};
