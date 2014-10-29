(function() {
  'use strict';

  function uppercase() {
    return function(text) {
      return text ? text.toUpperCase() : text;
    };
  }

  angular.module('common.filters.uppercase', [])
    .filter('uppercase', uppercase);
})();
