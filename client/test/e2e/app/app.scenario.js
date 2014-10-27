'use strict';
/*jshint undef:false */

(function() {
  /*jshint undef:false */
  describe('app', function() {
    var ptor;
    beforeEach(function() {
      ptor = protractor.getInstance();
      console.info('\nrunning:', jasmine.getEnv().currentSpec.description);
    });

    afterEach(function() {
      // Take a screenshot automatically after each test.

      var img = jasmine.getEnv().currentSpec.description.replace(/ /g, '-');
      browser.takeScreenshot().then(function(png) {

        //riscrivilo con gulpmagari
        var ws = require('fs').createWriteStream('asasa' + '.png', {
          encoding: 'base64'
        });
        ws.write(png, 'base64');
        console.log(png);
        ws.end();


        //  require('fs').writeFileSync("./webapp/test/e2e/screenshot/" + img + '.png', png, 'base64');
      });
    });


    it('should load the root', function() {
      ptor.get('/');
      expect(ptor.isElementPresent(by.css('body'))).toBe(true);
      expect(ptor.isElementPresent(by.css('h1'))).toBe(true);
    });

  });
})();
