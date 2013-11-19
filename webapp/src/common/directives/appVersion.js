angular.module('common.directive', [])
	.directive('appVersion', function() {
		return {
			restrict: "A",
			template: "version {{version}}"
		};
	});
