/* jshint undef:false*/
(function() {
  'use strict';

  describe('HomeCtrl', function() {
    var rootScope;
    var fakeData = ['some', 'data'];
    var ctrl;
    var scope;

    beforeEach(module('app'));
    beforeEach(inject(function($rootScope, $controller) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      ctrl = $controller('HomeCtrl as home', {
        $scope: scope,
        data: {
          data: fakeData
        }
      });
    }));

    it('should not be null', function() {
      expect(ctrl).not.toEqual(null);
    });

    it('should have "data" into its $scope', function() {
      expect(scope.home.data[0]).toEqual('some');
      expect(scope.home.data[1]).toEqual('data');
      expect(scope.home.data.length).toEqual(2);
    });
  });
})();
