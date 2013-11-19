'use strict';
/*
TODO
vedere grunt changed onli file su slide addy osmani
creare gist con tutti i grunt plughin interessanti
usare gocardless
fare tag git su goprod
usare rev con la versione
vedere angularfun
vedere jshint prop
watch e test
https://github.com/bevacqua/unbox

angularfun
https://github.com/mgechev/angularjs-style-guide
yearofmoo
vedere bootstrap di mean io
http://blog.diniscruz.com/2013/06/running-karmas-angularjs-example.html
http://docs.angularjs.org/guide/dev_guide.e2e-testing
http://blog.diniscruz.com/2013/06/a-small-angularjs-jasmine-test-executed.html

test angular app
*/
var _ = require('lodash'),
	moment = require('moment'),
	config = require('./build/config'),
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
		'tpl:build'
	]);

	grunt.registerTask('dist', [
		'jshint',
		'build',
		'karma:unit',
		'copy:dist_assets',
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

	grunt.registerTask('test-watch', ['karma:watch']);

};
