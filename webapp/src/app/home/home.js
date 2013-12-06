angular.module('app.home', [
	'ngRoute'
]).config(function config($routeProvider) {
	$routeProvider.when('/home', {
		controller: 'HomeCtrl',
		templateUrl: 'app/home/home.tpl.html'
	});
}).
controller('HomeCtrl', function() {});
