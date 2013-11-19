angular.module('app.example', [
	'ngRoute'
]).config(function config($routeProvider) {
	$routeProvider.when('/notes', {
		controller: 'NotesCtrl',
		templateUrl: 'app/notes/notes.tpl.html'
	});
}).
controller('NotesCtrl', function($scope, Notes) {
	$scope.data = {};
	$scope.data.notes = Notes.query();

	function reset() {
		$scope.addForm.$setPristine();
		$scope.data.newNote = '';
	}

	$scope.addNote = function() {
		var newNote = {
			'note': $scope.data.newNote
		};

		if ($scope.addForm.$valid) {
			var entry = new Notes();
			entry.note = newNote.note;
			entry.$save(function(data) {
				alertify.log("note saved :)");
				newNote.id = data.id;
				$scope.data.notes.push(newNote);
				reset();
			});
		}
	};
	$scope.deleteNote = function(index, id) {
		Notes.delete({
			id: id
		}, function() {
			alertify.log("note deleted :)");
			$scope.data.notes.splice(index, 1);
			reset();
		});
	};
	$scope.updateNote = function(note) {
		var key = {
			id: note.id
		};
		var value = {
			note: note.note
		};
		Notes.save(key, value, function(data) {
			alertify.log("note updated :)");
			note.note = data.note;
			reset();
		});
	};
});
