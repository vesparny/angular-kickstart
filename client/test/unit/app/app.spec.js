/* jshint undef:false*/
(function() {
  'use strict';

  describe('app module', function() {
    var module;
    var deps;

    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };

    beforeEach(function() {
      module = angular.module('app');
      deps = module.value('app').requires;
    });

    it('should be registered', function() {
      expect(module).not.toEqual(null);
    });

    it('should have ui.router as a dependency', function() {
      expect(hasModule('ui.router')).toEqual(true);
    });

    it('should have common.services.data as a dependency', function() {
      expect(hasModule('common.services.data')).toEqual(true);
    });
  });
})();
