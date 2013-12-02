window.bootstrap = function() {
	angular.bootstrap(document, ['app']);
};

window.init = function() {
	window.bootstrap();
};

angular.element(document).ready(function() {
	window.init();
});

angular.module('app', [
	'templates.app',
	'templates.common',
	'app.home',
	'app.notes',
	'ngRoute',
	'ngAnimate',
	'chieffancypants.loadingBar',
	'common.directives.appVersion',
	'common.directives.plusOne',
	'common.interceptors.http'
]).config(function myAppConfig($provide, $routeProvider, $locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({
		redirectTo: '/'
	});
}).run(function run($rootScope) {
	$rootScope.config = {
		"apiUrl": 'api/v1'
	};
	$rootScope.version = "0.0.1";
}).controller('AppCtrl', function AppCtrl($scope, $location) {
	$scope.title = "ng-kickstart";
	$scope.isActive = function(viewLocation) {
		return (viewLocation === $location.path());
	};
});
