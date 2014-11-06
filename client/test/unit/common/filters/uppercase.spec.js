/* jshint undef:false*/
(function() {
  'use strict';

  describe('Filters: uppercase', function() {

    var filter;
    beforeEach(module('common.filters.uppercase'));
    beforeEach(inject(function($filter) {
      filter = $filter;
    }));

    it('should create an uppercase string', function() {
      expect(filter('uppercase')('hello')).toEqual('HELLO');
    });
  });
})();
