'use strict';

module.exports = {

    /*
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
        'webapp/vendor/angular/angular.js',
        'webapp/vendor/angular-mocks/angular-mocks.js',
        'webapp/vendor/angular-ui-router/release/angular-ui-router.js',
        'webapp/vendor/angular-animate/angular-animate.js',
        'webapp/vendor/angular-loading-bar/build/loading-bar.js',
        'webapp/vendor/alertify/alertify.js',
        'webapp/src/**/*.js',
        'webapp/tmp/*.js',
        'webapp/test/unit/**/*.spec.js'
    ],
    frameworks: ['jasmine'],
    /*
     * How to report, by default.
     */
    reporters: ['mocha'],

    /*
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    logLevel: "info",

    urlRoot: '/__test/',

    /**
     * Disable file watching by default.
     */

    /*
       which Browser to use
       */
    browsers: ['Chrome'],

};
