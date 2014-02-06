describe('Controller: CalenderCtrl', function() {
  var CalendarCtrl, scope, httpBackend;
  var fakeAssignments = function() {
    return {
      rows: [
        { 'value': {
            "_id": "6109863cf082ead089412b048c00a2e3",
            "_rev": "1-5084d907efbb03cc5d5f0724c1912a13",
            "name": "Midterm Practice",
            "date": "2013-10-12T04:00:00.000Z",
            "course": {
               "name": "CPT",
               "number": "220"
            },
            "type": "assignment"
          }
        },
        { 'value': {
            "_id": "6109863cf082ead089412b048c00976d",
            "_rev": "1-9a3c89b0cf0bdd03ed468717d471c83a",
            "name": "Hosting Assignment",
            "date": "2013-10-05T04:00:00.000Z",
            "course": {
               "name": "CPT",
               "number": "220"
            },
            "type": "assignment"
          }
        }
      ]
  };
  };
  beforeEach(module('SchoolApp'));

  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();

    httpBackend = $httpBackend;
    httpBackend.whenGET('/api/assignments/all').respond(fakeAssignments());
    $controller('CalendarCtrl', {
      $scope: scope,
    });
    httpBackend.flush();
  }));

  it('should have scope.assignments have a length of 2', function() {
    expect(scope.assignments.length).toEqual(2);
  });
});

