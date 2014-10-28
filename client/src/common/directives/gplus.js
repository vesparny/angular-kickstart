(function() {
  'use strict';

  function gplus($window) {
    return {
      link: function(scope, element, attrs) {
        $window.gapi.plus.render(element[0], {
          'size': 'medium',
          'href': 'http://bit.ly/ng-kickstart'
        });
      }
    };

  }
  angular.module('common.directives.gplus', [])
    .directive('gplus', gplus);
})();
