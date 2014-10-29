(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('getting-started', {
        url: 'getting-started',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'src/common/footer.tpl.html',
            controller: 'FooterCtrl'
          }
        }
      })
      .state('root.getting-started', {
        url: '/getting-started',
        views: {
          '@': {
            templateUrl: 'src/app/getting-started/getting-started.tpl.html',
            controller: 'DocsCtrl as docs'
          }
        }
      });
  }

  function gettingStartedCtrl($log, $scope) {
    /*jshint validthis:true */
    var docs = this;
  }

  angular.module('getting-started', [])
    .config(config)
    .controller('GettingStartedCtrl', gettingStartedCtrl);
})();
