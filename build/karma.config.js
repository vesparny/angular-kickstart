'use strict';

var baseDir = 'client';

module.exports = {
  /*
    This is the list of file patterns to load into the browser during testing.
   */
  files: [
    baseDir + '/vendor/angular/angular.js',
    baseDir + '/vendor/angular-mocks/angular-mocks.js',
    baseDir + '/vendor/angular-ui-router/release/angular-ui-router.js',
    baseDir + '/src/**/*.js',
    'build/tmp/*.js',
    baseDir + '/test/unit/**/*.spec.js'
  ],
  frameworks: ['jasmine'],

  plugins: [
    'karma-chrome-launcher',
    'karma-jasmine',
    'karma-coverage',
    'karma-html-reporter',
    'karma-mocha-reporter',
    'karma-coverage-reporter'
  ],

  preprocessors: {
    '**/client/src/**/*.js': 'coverage'
  },

  reporters: ['mocha', 'html', 'coverage'],

  junitReporter: {
    outputFile: baseDir + '/test/unit-results/xml/junit-results.xml'
  },

  coverageReporter: {
    type: 'html',
    dir: baseDir + '/test/unit-results/coverage',
    file: 'coverage.html'
  },

  htmlReporter: {
    outputDir: baseDir + '//test/unit-results/html'
  },
  /*
   * On which port should the browser connect, on which port is the test runner
   * operating, and what is the URL path for the browser to use.
   */
  logLevel: 'info',

  urlRoot: '/__test/',

  /*
  which Browser to use
  */
  browsers: ['Chrome'],

};
