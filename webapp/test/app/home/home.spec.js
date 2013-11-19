describe('home', function() {
		beforeEach(inject(function($rootScope) {
			scope = $rootScope;
		}));

	it('should have a dummy test', function(scope) {
		expect(scope.version).toBe("asas");
	});
});
