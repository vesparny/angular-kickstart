(function() {
  'use strict';

  function httpInterceptor($q, $log, $injector) {
    return {
      request: function(config) {
        return config;
      },
      requestError: function(rejection) {
        $log.debug(rejection);
        return $q.reject(rejection);
      },
      response: function(response) {
        $log.debug('response: ', response);
        return response;
      },
      responseError: function(rejection) {
        $log.debug(rejection);
        $injector.invoke(function(Utils) {
          Utils.alertError(rejection.data);
        });
        return $q.reject(rejection);
      }
    };
  }

  angular.module('common.interceptors.http', [])
    .factory('httpInterceptor', httpInterceptor);
})();
