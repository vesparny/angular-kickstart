'use strict';

module.exports = function(karma) {
	karma.configure({
		/*
		 * From where to look for files, starting with the location of this file.
		 */
		basePath: '../',
		/*
		 * This is the list of file patterns to load into the browser during testing.
		 */
		files: [
			'webapp/vendor/angular/angular.js',
			'webapp/vendor/angular-mocks/angular-mocks.js',
			'webapp/vendor/angular-route/angular-route.js',
			'webapp/vendor/angular-resource/angular-resource.js',
			'webapp/vendor/angular-animate/angular-animate.js',
			'webapp/vendor/angular-loading-bar/build/loading-bar.js',
			'webapp/vendor/alertify/alertify.js',
			'webapp/src/**/*.js',
			'build/tmp/templates*.js',
			'webapp/test/**/*.spec.js'
		],
		exclude: [
			'webapp/src/assets/**/*.js'
		],
		frameworks: ['jasmine'],
		plugins: ['karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher'],
		/*
		 * How to report, by default.
		 */
		reporters: 'dots',
		/*
		 * On which port should the browser connect, on which port is the test runner
		 * operating, and what is the URL path for the browser to use.
		 */
		port: 9018,
		runnerPort: 9100,
		urlRoot: '/__test/',

		/**
		 * Disable file watching by default.
		 */
		autoWatch: false,

		/*
     which Browser to use
     */
		browsers: ['Chrome'],
		/*
     if true, it capture browsers, run tests and exit
     */
		singleRun: true
	});
};
