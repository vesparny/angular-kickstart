angular.module('app.service', ['ngResource']).
factory('Notes', function($resource, $rootScope) {
	return $resource($rootScope.config.apiUrl + '/notes/:id', {
		id: '@id'
	});
});
