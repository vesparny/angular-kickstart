'use strict';
var fs =   require('fs');

exports.takeScreenshot = function(browser, filename) {
  browser.takeScreenshot().then(function(png) {
  fs.writeFileSync('./client/test/screenshots/' + filename + '.png', png, 'base64');
  });
};
