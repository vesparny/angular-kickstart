exports.config = {
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  specs: [
    'wepapp/test/e2e/**/*.scenario.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },
  seleniumServerJar: './../node_modules/protractor/selenium/selenium-server-standalone-2.39.0.jar',

  baseUrl: 'http://172.18.174.95:3000'
};
