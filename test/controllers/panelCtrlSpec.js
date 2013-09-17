describe('Controller: PanelCtrl', function() {
  var PanelCtrl, scope, httpBackend;
  beforeEach(module('SchoolApp'));
  beforeEach(inject(function($rootScope, $http, $controller, $httpBackend, $injector) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    httpBackend.whenGET('/api/course/list').respond(getCourseList());
    httpBackend.whenDELETE('/api/course/delete/0002?rev=1002').respond();
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
    var testObj =  [
    {
      name: 'CPT',
      number: '101',
      description:'Beginner Computer Class',
      type: 'class',
      _id: '0000',
      _rev: '1000'
    },
    {
      name: 'IST',
      number: '101',
      description:'Beginner Network Class',
      type: 'class',
      _id: '0001',
      _rev: '1001'
    },
    {
      name: 'ENG',
      number: '101',
      description:'Composition 1',
      type: 'class',
      _id: '0002',
      _rev: '1002'
    }
  ];
    expect(scope.courseList).toEqual(testObj);
  });
  it('should have a method called remove', function() {
    expect(scope.remove).toBeDefined();
  });
  it('should remove from the courseList when removed is called', function() {
    scope.remove({
      name: 'ENG',
      number: '101',
      description:'Composition 1',
      type: 'class',
      _id: '0002',
      _rev: '1002'
    }, 2);
    var removeTestObj = [
      {
        name: 'CPT',
        number: '101',
        description:'Beginner Computer Class',
        type: 'class',
        _id: '0000',
        _rev: '1000'
      },
      {
        name: 'IST',
        number: '101',
        description:'Beginner Network Class',
        type: 'class',
        _id: '0001',
        _rev: '1001'
      }
    ]; 
    expect(scope.courseList).toEqual(removeTestObj);
    
  });
});

var getCourseList = function() {
  return [
    {
      name: 'CPT',
      number: '101',
      description:'Beginner Computer Class',
      type: 'class',
      _id: '0000',
      _rev: '1000'
    },
    {
      name: 'IST',
      number: '101',
      description:'Beginner Network Class',
      type: 'class',
      _id: '0001',
      _rev: '1001'

    },
    {
      name: 'ENG',
      number: '101',
      description:'Composition 1',
      type: 'class',
      _id: '0002',
      _rev: '1002'
    }
  ];
};