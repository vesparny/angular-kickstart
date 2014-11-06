(function() {
  'use strict';

  function dataService() {
    return {
      get: function() {
        return ['some', 'data'];
      }
    };
  }

  angular.module('common.services.data', [])
    .factory('DataService', dataService);
})();
