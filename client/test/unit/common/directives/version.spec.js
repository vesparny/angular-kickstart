/* jshint undef:false*/
(function() {
  'use strict';

  describe('Directive: version', function() {

    var compile;
    var rootScope;

    beforeEach(module('common.directives.version'));
    beforeEach(function() {
      module(function($provide) {
        //mocking version value
        $provide.value('version', 'test');
      });
    });

    beforeEach(inject(function($compile, $rootScope) {
      compile = $compile;
      rootScope = $rootScope;
    }));

    it('should display the version number', function() {
      var element = compile('<div app-version></div>')(rootScope);
      expect(element.html()).toMatch(/test/i);
    });




  });
})();
