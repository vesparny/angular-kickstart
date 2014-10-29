(function() {
  'use strict';

  function footerCtrl($log) {
    $log.debug('Footer loaded');
  }

  angular.module('common.footer', [])
    .controller('FooterCtrl', footerCtrl);
})();
