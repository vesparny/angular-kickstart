(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.getting-started', {
        url: '/getting-started',
        views: {
          '@': {
            templateUrl: 'src/app/getting-started/getting-started.tpl.html',
            controller: 'GettingStartedCtrl as docs'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function GettingStartedCtrl($log, $scope) {
    /*jshint validthis:true */
    var docs = this;
  }

  angular.module('getting-started', [])
    .config(config)
    .controller('GettingStartedCtrl', GettingStartedCtrl);
})();
