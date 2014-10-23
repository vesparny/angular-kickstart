angular.module('app.home', [
		'ui.router'
]).config(function config($stateProvider) {
		$stateProvider
				.state({
						name: "home",
						url: "/",
						templateUrl: "app/home/ome.tpl.html",
						controller: "HomeCtrl",
						data: {
								pageTitle: "Home"
						}
				});
}).
controller('HomeCtrl', function() {
});
