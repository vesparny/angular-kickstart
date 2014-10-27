(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('docs', {
        url: 'docs',
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
      .state('root.docs', {
        url: '/docs',
        views: {
          '@': {
            templateUrl: 'src/app/docs/docs.tpl.html',
            controller: 'DocsCtrl as docs'
          }
        }
      });
  }

  function docsCtrl($log, $scope) {
    /*jshint validthis:true */
    var docs = this;
  }

  angular.module('docs', [])
    .config(config)
    .controller('DocsCtrl', docsCtrl);
})();
