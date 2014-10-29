'use strict';

var baseDir = 'client';
//this is the port the application is running on
var port =  3000;

exports.config = {
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  specs: [
    baseDir + '/test/e2e/**/*.scenario.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },
  seleniumArgs: ['-browserTimeout=60'],
  baseUrl: 'http://127.0.0.1:'+port
};
