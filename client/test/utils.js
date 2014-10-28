'use strict';

exports.takeScreenshot = function(browser, filename) {
  browser.takeScreenshot().then(function(png) {
    require('fs').writeFileSync('./client/test/screenshots/' + filename + '.png', png, 'base64');
  });
};
