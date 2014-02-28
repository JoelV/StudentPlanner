describe('Controller: PanelCtrl', function() {
  var scope, httpBackend, createController, init, windowMock;
  beforeEach(module('SchoolApp'));
  beforeEach(inject(function($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    windowMock = {
      confirm: function() {return true;}
    };

    createController = function() {
      return $controller('PanelCtrl', {
        $scope: scope,
        $window: windowMock
      });
    };
    init = function() {
      httpBackend.whenGET('/api/course/list').respond(getCourseList());
      createController();
      httpBackend.flush(); 
    };
  }));
  describe('load data:', function() {
    it('course list', function() {
      init();
      expect(scope.courseList).toEqual(getCourseList());
    });
  })
  describe('remove:', function() {
    it('should remove from the courseList when removed is called', function() {
      init();
      httpBackend.whenDELETE('/api/course/delete/0002?rev=1002').respond(200);
      scope.remove({
        name: 'ENG',
        number: '101',
        description:'Composiition 1',
        type: 'class',
        _id: '0002',
        _rev: '1002'
      }, 2);
      httpBackend.flush();
      expect(scope.courseList.length).toBe(2); expect(scope.courseList[1].name).toEqual('IST');
      
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
        description:'Composiition 1',
        type: 'class',
        _id: '0002',
        _rev: '1002'
      }
    ];
  };
});