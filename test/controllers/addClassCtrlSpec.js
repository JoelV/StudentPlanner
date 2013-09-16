describe('Controllers: AddClassCtrl', function() {
  var AddClassCtrl, scope;
  beforeEach(module('SchoolApp'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    AddClassCtrl = $controller('AddClassCtrl', {$scope: scope});
  }));

  it('should have AddClassCtrl', function() {
    expect(AddClassCtrl).not.toBeNull();
  });
  it('should have a method add in AddClassCtrl', function() {
    expect(scope.add).toBeDefined();
  });
});