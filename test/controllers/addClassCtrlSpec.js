describe('Controllers: AddClassCtrl', function() {
  var AddClassCtrl, scope;
  beforeEach(module('SchoolApp'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();

    AddClassCtrl = $controller('AddClassCtrl', {$scope: scope});
  }));

  xit('should have AddClassCtrl', function() {
    expect(AddClassCtrl).not.toBeNull();
  });
  xit('should have a method add in AddClassCtrl', function() {
    expect(scope.add).toBeDefined();
  });
});