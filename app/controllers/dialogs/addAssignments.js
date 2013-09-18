angular.module('SchoolApp')
  .controller('AddAssignmentsCtrl', function($scope, dialog, $course, $http) {
    $scope.course = $course.getCourse();
    $scope.close = function() {
      dialog.close();
    };

    $scope.add = function(assignment) {
      assignment.course = {};
      assignment.course.name = $scope.course.name;
      assignment.course.number = $scope.course.number; 
      assignment.type = 'assignment';
      $http.put('/api/assignment/add', assignment)
        .success(function() {
          $scope.assignment.name = "";
          $scope.assignment.date = "";
        });
    };
  });