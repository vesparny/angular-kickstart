// Generated on 2013-11-08 using generator-webapp 0.4.4
'use strict';


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	var config = require("./build/build.conf");

	function getJs() {
		var js = config.vendor_files.js,
			appJs =
				grunt.file.expand([
					config.build_dir + '/webapp/src/**/*.js'
				]);
		appJs.forEach(function(filePath) {
			js.push(filePath.replace(filePath.substring(0, filePath.indexOf('webapp')), ''));
		});
		js.push("templates-app.js")
		js.push("templates-common.js");
		return js
	}

	function getJsDist() {
		var js = [],
			vendor = grunt.file.expand([
				config.dist_dir + '/assets/js/*vendor.js'
			]),
			app = grunt.file.expand([
				config.dist_dir + '/assets/js/*app.js'
			]);
		vendor.forEach(function(filePath) {
			js.push(filePath.replace(filePath.substring(0, filePath.indexOf('assets')), ''));
		});
		app.forEach(function(filePath) {
			js.push(filePath.replace(filePath.substring(0, filePath.indexOf('assets')), ''));
		});
		return js.concat(vendor).concat(app);
	}

	function getCss() {
		var css = config.vendor_files.css,
			appCss = grunt.file.expand([
				config.build_dir + '/assets/css/*.css'
			]);
		appCss.forEach(function(filePath) {
			css.push(filePath.replace(filePath.substring(0, filePath.indexOf('assets')), ''));
		});

		return css;

	}

	function getCssDist() {
		var css = [],
			appCss = grunt.file.expand([
				config.dist_dir + '/assets/css/*.css'
			]);
		appCss.forEach(function(filePath) {
			css.push(filePath.replace(filePath.substring(0, filePath.indexOf('assets')), ''));
		});

		return css;

	}

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		// configurable paths
		yeoman: {
			app: 'app',
			dist: 'dist'
		},
		config: config,




	});



	grunt.registerTask('serve', function(target) {
		if (target === 'dist') {
			return grunt.task.run(['dist', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:tmp',
			'html2js:app',
			'html2js:common',
			'sass:dev',
			'copy:webapp_assets',
			'copy:webapp_js',
			'copy:vendor_js',
			'copy:vendor_css',
			'template:index_build',
			'connect:livereload',
			'watch'

		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'mocha'
	]);




	grunt.registerTask('default', [
		'jshint',
		'test',
		'build',
	]);
};
