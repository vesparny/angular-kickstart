angular.module('app.docs', []).config(function config($routeProvider) {
	$routeProvider.when('/gettingStarted', {
		templateUrl: 'app/docs/docs.tpl.html'
	});
});
