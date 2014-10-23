angular.module('app.docs', []).config(function config($stateProvider) {
	$stateProvider.state( {
		name:"docs",
		url:"/gettingStarted",
		templateUrl: 'app/docs/docs.tpl.html'
	});
});
