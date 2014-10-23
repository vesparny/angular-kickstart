window.app = window.app || {};

app.bootstrap = function() {
	angular.bootstrap(document, ['app']);
};

app.init = function() {
	app.bootstrap();
};

app.config = {
	apiUrl: 'api/v1',
	version: "0.0.3"
};

angular.element(document).ready(function() {
	app.init();
});

angular.module('app', [
	'templates',
	'app.home',
	'app.notes',
	'app.docs',
	'ui.router',
	'ngAnimate',
	'chieffancypants.loadingBar',
	'common.directives.appVersion',
	'common.directives.plusOne',
	'common.interceptors.http'
]).config(function myAppConfig($stateProvider, $urlRouterProvider, $logProvider) {
	$urlRouterProvider.otherwise("/");
	$logProvider.debugEnabled(true);
}).run(function run($rootScope, $window) {
	$rootScope.config = $window.app.config;
	$rootScope.$on('$stateChangeSuccess', function(next, current) {
		$window.scrollTo(0, 0);
	});
}).controller('AppCtrl', function AppCtrl($scope, $location) {
	$scope.isActive = function(viewLocation) {
		return (viewLocation === $location.path());
	};
});
