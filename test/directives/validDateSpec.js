describe('Directive: validDate', function() {
  var $scope, form;
  beforeEach(module('SchoolApp'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '  <input valid-date="-" ng-model="model.input" name="input">' +
      '</form>'
      );
    $scope.model = {input: null};
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));
  it('should expect 19-19-2013 to be invalid', function() {
    form.input.$setViewValue('19-19-2013');
    expect(form.input.$invalid).toBe(true);
  });
  it('should expect 09-09-2013 to be valid', function() {
    form.input.$setViewValue('09-09-2013');
    expect(form.input.$valid).toBe(true);
  });
});