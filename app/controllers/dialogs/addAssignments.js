angular.module('SchoolApp')
  .controller('AddAssignmentsCtrl', function($scope, $modalInstance, course, mode, $from, $window) {
    $scope.mode = mode;
    $scope.close = function() {
      $modalInstance.close();
      if($from.getFrom() === 'assignments')  
        $window.location.href = '/assignments/' + $scope.course.name + '-' + $scope.course.number;
    };

    $scope.add = function(assignment) {
      assignment.course = {};
      assignment.course.name = course.name;
      assignment.course.number = course.number; 
      assignment.type = 'assignment';
      var date = moment(assignment.date, 'MM-DD-YYYY').toISOString();
      assignment.date = date;
      $modalInstance.close(assignment);
    };
  });