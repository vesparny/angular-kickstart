angular.module('app.notes', [
	'ngRoute'
]).config(function config($routeProvider) {
	$routeProvider.when('/notes', {
		controller: 'NotesCtrl as notesCtrl',
		templateUrl: 'app/notes/notes.tpl.html',
		resolve: {
			notesList: function(NotesService) {
				return NotesService.query();
			}
		}
	});
}).controller('NotesCtrl', function($scope, NotesService, notesList) {
	var app = this;
	app.notes = notesList;

	app.reset = function() {
		$scope.addForm.$setPristine();
		app.newNote = '';
	};

	app.addNote = function(newNote) {
		if ($scope.addForm.$valid) {
			var entry = new NotesService();
			entry.note = newNote;
			entry.$save(function(data) {
				alertify.log("note saved :)");
				app.notes.push({
					id: data.id,
					note: newNote
				});
				app.reset();
			});
		}
	};
	app.deleteNote = function(index, id) {
		NotesService.delete({
			id: id
		}, function() {
			alertify.log("note deleted :)");
			app.notes.splice(index, 1);
			app.reset();
		});
	};
	app.updateNote = function(note) {
		var key = {
			id: note.id
		};
		var value = {
			note: note.note
		};
		NotesService.save(key, value, function(data) {
			alertify.log("note updated :)");
			note.note = data.note;
			app.reset();
		});
	};
});
