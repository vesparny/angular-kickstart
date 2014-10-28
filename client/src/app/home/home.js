(function() {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('root', {
        url: '',
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
      .state('root.home', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'src/app/home/home.tpl.html',
            controller: 'HomeCtrl as home',
            resolve: {
              data: function(DataService){
                return DataService.get();
              }
            }
          }
        }
      });
  }

  function homeCtrl(data) {
    /*jshint validthis:true */
    var home = this;
    this.data = data.data;
  }

  angular.module('home', [])
    .config(config)
    .controller('HomeCtrl', homeCtrl);
})();
