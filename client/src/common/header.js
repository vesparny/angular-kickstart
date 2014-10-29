(function() {
  'use strict';

  function headerCtrl($log) {
    $log.debug('Header loaded');
  }

  angular.module('common.header', [])
    .controller('HeaderCtrl', headerCtrl);
})();
