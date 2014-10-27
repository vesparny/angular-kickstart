(function() {
  'use strict';

  function gplus() {
    return {
      link: function(scope, element, attrs) {
        gapi.plusone.render(element[0], {
          'size': 'medium',
          'href': 'http://bit.ly/ng-kickstart'
        });
      }
    };

  }
  angular.module('common.directives.gplus', [])
    .directive('gplus', gplus);
})();
