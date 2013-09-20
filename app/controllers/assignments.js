angular.module('SchoolApp')
  .controller('AssignmentCtrl', function($scope, $routeParams, $http) {
    $scope.className = $routeParams.className;
    $http.get('/api/assignment/list/' + $routeParams.className)
      .success(function(assignmentList) {
        $scope.assignmentList = assignmentList;
      });
  });