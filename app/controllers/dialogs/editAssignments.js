angular.module('SchoolApp')
  .controller('EditAssignmentsCtrl', function($scope, dialog, $mode, $assignment, $http, $window) {
    $scope.mode = $mode.getMode();
    $scope.assignment = $assignment.getAssignment();

    $scope.close = function() {
      dialog.close();
    };

    //save button
    $scope.add = function(assignment) {
      $http.put('/api/assignment/edit', assignment)
        .success(function() {
          dialog.close();
          $window.location.href = '/assignments/' + $scope.assignment.course.name + '-' + $scope.assignment.course.number;
        });
    };
  });