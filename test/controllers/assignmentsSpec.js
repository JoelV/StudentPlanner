describe('Controller: AssignmentCtrl', function() {
  var scope, routeParams, httpBackend;
  beforeEach(module('SchoolApp'));

  beforeEach(inject(function($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();
    routeParams = {className: 'CPT-101'};
    httpBackend = $httpBackend;

    httpBackend.whenGET('/api/assignment/list/CPT-101').respond(getAssignmentList());
    $controller('AssignmentCtrl', {
      $scope: scope,
      $routeParams: routeParams,
    }); 
    httpBackend.flush();
  }));
  //TODO test.
  it('should have routeParams to be CPT-101', function() {
    expect(routeParams.className).toEqual('CPT-101');
  });
  it('should have a courseList array with length 2', function() {
    expect(scope.assignmentList.length).toEqual(2);
  });
  it('shoould have a method called edit', function() {
    expect(scope.edit).toBeDefined();
  });
  it('should have a method called addAssignmnets', function() {
    expect(scope.addAssignments).toBeDefined();
  });
  it('should have a method called delete', function() {
    expect(scope.delete).toBeDefined();
  });

  var getAssignmentList = function() {
    return [ 
      {_id: "82d3734e7b0d6e07613997b346002c28", 
       _rev: "1-92800a83468f82d78431a6d1e3ccc5b1", 
        name: "Read Chapter 9", 
        date: "09-09-2013", 
        course: {name: "CPT", number: "102"}, 
        type: "assignment"
      },
      {_id: "82d3734e7b0d6e07613997b346003860", 
       _rev: "1-007c6b6f7b55d72ff1e565d96ab9b8b7", 
       name: "Internet Search Exercise", 
       date: "09-15-2013", 
       course: {name: "CPT", number: "102"}, 
       type: "assignment"
      }    
    ];
  }
});
