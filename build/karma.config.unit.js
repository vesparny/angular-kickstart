module.exports = function(karma) {
  karma.configure({
    /**
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
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


    /**
     * How to report, by default.
     */
    reporters: 'dots',

    /**
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

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
