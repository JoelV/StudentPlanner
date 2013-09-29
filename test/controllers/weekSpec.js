describe('Controller: Week', function() {
  var WeekCtrl, scope;
  beforeEach(module('SchoolApp'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new(); 
    WeekCtrl = $controller('WeekCtrl', {$scope: scope});
  }));
  it('should have WeekCtrl', function() {
    expect(WeekCtrl).toBeDefined();
  });
  it('should have array called week filled with days of the week', function() {
    expect(scope.week[0].format('dddd')).toEqual('Sunday');
  });
});