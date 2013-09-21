describe('Controllers: EditAssignmentsCtrl', function() {
  var EditAssignmentsCtrl, scope;
  beforeEach(module('SchoolApp'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new(); 
    EditAssignmentsCtrl = $controller('EditAssignmentsCtrl', {$scope: scope});
  }));

  xit('should have an EditAssignmentsCtrl', function() {
    expect(EditAssignmentsCtrl).toBeDefined();
  });
});