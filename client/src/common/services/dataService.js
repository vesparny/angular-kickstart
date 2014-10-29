(function() {
  'use strict';

  function dataService() {
    return {
      get: function(url) {
        return ['some', 'data'];
      }
    };
  }

  angular.module('common.services.data', [])
    .factory('DataService', dataService);
})();
