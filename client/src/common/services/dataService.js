(function() {
  'use strict';

  function dataService() {
    return {
      get: function(url) {
        return [];
      }
    };
  }

  angular.module('common.services.data', [])
    .factory('DataService', dataService);
})();
