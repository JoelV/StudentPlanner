angular.module('SchoolApp')
  .controller('EditAssignmentsCtrl', function($scope, $modalInstance, mode, assignment, $http, $window) {
    $scope.mode = mode;
    $scope.assignment = assignment;

    $scope.close = function() {
      $modalInstance.close();
    };

    //save button
    $scope.add = function(assignment) {
      $modalInstance.close(assignment);
    };
  });