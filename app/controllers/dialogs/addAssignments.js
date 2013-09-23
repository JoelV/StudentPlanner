angular.module('SchoolApp')
  .controller('AddAssignmentsCtrl', function($scope, dialog, $course, $http, $mode, $from, $window) {
    $scope.course = $course.getCourse();
    $scope.mode = $mode.getMode();
    $scope.close = function() {
      dialog.close();
      if($from.getFrom() === 'assignments')  
        $window.location.href = '/assignments/' + $scope.course.name + '-' + $scope.course.number;
    };

    $scope.add = function(assignment) {
      assignment.course = {};
      assignment.course.name = $scope.course.name;
      assignment.course.number = $scope.course.number; 
      assignment.type = 'assignment';
      var date = moment(assignment.date, 'MM-DD-YYYY').toISOString();
      assignment.date = date;
      $http.put('/api/assignment/add', assignment)
        .success(function() {
          $scope.assignment.name = "";
          $scope.assignment.date = "";
        });
    };
  });