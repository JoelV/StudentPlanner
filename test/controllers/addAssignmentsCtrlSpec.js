describe('Controllers: AddAssignmentsCtrl', function() {
  var AddAssignmentsCtrl, scope;
  beforeEach(module('SchoolApp'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    AddAssignmentsCtrl = $controller('AddAssignmentsCtrl', {
      $scope: scope
    });
  }));
  xit('should have AddAssignmentsCtrl', function() {
    expect(AddAssignmentsCtrl).toBeDefined();
  });
});