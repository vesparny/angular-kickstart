angular.module('app.docs', []).config(function config($routeProvider) {
	$routeProvider.when('/docs', {
		templateUrl: 'app/docs/docs.tpl.html'
	});
});
