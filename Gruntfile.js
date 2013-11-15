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
var _ = require('lodash');
var moment = require('moment');
var config = require('./build/buildfiles/');

module.exports = function(grunt) {
	grunt.log.write('%s - Loading external tasks...', moment().format());

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.log.writeln('done');

	grunt.loadTasks('./build/buildfiles/tasks');
	grunt.initConfig(_.merge.apply({}, _.values(config)));

	grunt.registerTask('serve', [
		'build',
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
		'connect:dist:keepalive'
	]);

	grunt.registerTask('release', [
		'bump',
		'changelog'
	]);

	grunt.registerTask('default', 'serve');

};
