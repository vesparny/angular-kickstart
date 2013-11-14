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
var config = require('./build/config');

module.exports = function(grunt) {
	grunt.log.write('%s - Loading external tasks...', moment().format());

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.log.writeln('done');

	grunt.loadTasks('./build/tasks');
	grunt.initConfig(_.merge.apply({}, _.values(config)));

	function createTask(name, tasks) {
		grunt.registerTask(name, tasks.split(' '));
	}

	// build tasks
	createTask('images:debug', 'clean:images copy:images sprite');
	createTask('images:release', 'images:debug imagemin:all rev:images');

	createTask('css:debug', 'clean:css stylus:all csslint');
	createTask('css:release', 'clean:css stylus:all cssmin:release rev:css');

	createTask('js:debug', 'clean:js copy:js_sources copy:js_bower_debug jshint');
	createTask('js:release', 'clean:js copy:js_sources uglify:js clean:after_uglify copy:js_bower_release rev:js');

	createTask('views:debug', 'clean:views jade:debug');
	createTask('views:release', 'clean:views jade:release');



	createTask('build:debug', 'clean html2js sass copy:webapp_assets copy:webapp_js copy:vendor_js copy:vendor_css tpl:build connect:livereload watch');
	createTask('build:release', 'clean copy:other images:release css:release js:release views:release usemin bump-only:build');

	// testing tasks
	createTask('test', 'jshint csslint mochaTest:unit karma:unit_once');

	// development and debugging tasks
	createTask('dev_setup', 'pem_decrypt:dev');
	createTask('dev', 'build:debug');

	// continuous integration and deployment tasks
	createTask('ci', 'build:release test');

	createTask('default', 'dev');


	grunt.registerTask('dist', [
		//'jshint',
		'clean:dist',
		'copy:dist_assets',
		'concat:build_css',
		'cssmin',
		'ngmin',
		'concat:js_app',
		'concat:js_vendor',
		'uglify',
		'rev',
		'imagemin',
		'svgmin',
		'template:index_dist',
		'htmlmin'


	]);

};
