angular.module('common.directives.appVersion', [])
	.directive('appVersion', function() {
		return {
			restrict: "A",
			template: "v{{version}}"
		};
	});
