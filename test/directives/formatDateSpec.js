describe('Directive: FormatDate', function() {
  var $scope, form;
  beforeEach(module('SchoolApp'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '  <input format-date="-" ng-model="model.input" name="input">' +
      '</form>'
      );
    $scope.model = {input: null};
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));
  it('should format date', function() {
    form.input.$setViewValue('09092013');
    expect($scope.model.input).toEqual('09-09-2013');
  });
});