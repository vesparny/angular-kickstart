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
	'app.example',
	'ngRoute',
	'ngAnimate',
	'chieffancypants.loadingBar',
	'app.service',
	'common.directive'
]).config(function myAppConfig($provide, $routeProvider, $locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
	$httpProvider.interceptors.push(function($q) {
		return {
			'responseError': function(rejection) {
				alertify.error(rejection.data.message);
				return $q.reject(rejection);
			}
		};
	});
}).run(function run($rootScope) {
	$rootScope.config = {
		"apiUrl": 'api/v1'
	};
	$rootScope.version = "0.0.1";
}).controller('AppCtrl', function AppCtrl($scope, $location) {
	$scope.title = "silex + angularjs";
	$scope.isActive = function(viewLocation) {
		return (viewLocation === $location.path());
	};
});
