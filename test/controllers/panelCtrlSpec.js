describe('Controller: PanelCtrl', function() {
  var PanelCtrl, scope, httpBackend;
  beforeEach(module('SchoolApp'));
  beforeEach(inject(function($rootScope, $http, $controller, $httpBackend, $injector) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    httpBackend.whenGET('/api/course/list').respond(getCourseList());
    PanelCtrl = $controller('PanelCtrl', {
      $scope: scope,
      $http: $http 
    });
    httpBackend.flush();
  }));

  it('should have PanelCtrl', function() {
    expect(PanelCtrl).toBeDefined();
  });
  it('should have a courseList to equal testObj', function() {
    var testObj = { 
      name: 'CPT',
      number: '101',
      description:'Beginner Computer Class',
      type: 'class'  
    };
    expect(scope.courseList).toEqual(testObj);
  });
});

var getCourseList = function() {
  return {
    name: 'CPT',
    number: '101',
    description:'Beginner Computer Class',
    type: 'class'
  };
};