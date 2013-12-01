angular.module('common.interceptors.http', []).config(function($provide, $httpProvider) {
	$httpProvider.interceptors.push(function($q) {
		return {
			'responseError': function(rejection) {
				alertify.error(rejection.data.message);
				return $q.reject(rejection);
			}
		};
	});
});
