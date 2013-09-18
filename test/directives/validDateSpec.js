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
  it('should validate date', function() {
    form.input.$setViewValue('09-092013');
    expect(form.input.$valid).toBe(false);
  });

})