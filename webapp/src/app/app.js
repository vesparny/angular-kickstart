window.app = window.app || {};

app.bootstrap = function() {
	angular.bootstrap(document, ['app']);
};

app.init = function() {
	app.bootstrap();
};

app.config = {
	apiUrl: 'api/v1',
	version: "0.0.1"
};

angular.element(document).ready(function() {
	app.init();
});

angular.module('app', [
	'templates.app',
	'templates.common',
	'app.home',
	'app.notes',
	'app.docs',
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
}).run(function run($rootScope, $window) {
	$rootScope.config = $window.app.config;
}).controller('AppCtrl', function AppCtrl($scope, $location) {
	$scope.title = "ng-kickstart | easy AngularJS development";
	$scope.isActive = function(viewLocation) {
		return (viewLocation === $location.path());
	};
});
