describe('home', function() {
	var scope;
	beforeEach(module('app'));
	beforeEach(inject(function($rootScope) {
		scope = $rootScope;
	}));

	it('should have a dummy test', function() {
		expect(scope.version).toBe("0.0.1");
	});
});
