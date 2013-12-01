angular.module('notes.service', ['ngResource']).
factory('NotesService', function($resource, $rootScope) {
	return $resource($rootScope.config.apiUrl + '/notes/:id', {
		id: '@id'
	});
});
