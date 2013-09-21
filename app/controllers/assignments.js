angular.module('SchoolApp')
  .controller('AssignmentCtrl', function($scope, $routeParams, $http, $dialog, $mode, $assignment) {
    $scope.className = $routeParams.className;
    $http.get('/api/assignment/list/' + $routeParams.className)
      .success(function(assignmentList) {
        $scope.assignmentList = assignmentList;
      });
    $scope.edit = function(assignment) {
      $mode.setMode('Edit');
      $assignment.setAssignment(assignment);
      $dialog.dialog().open(
        '../app/templates/dialogs/assignmentsForm.html',
        'EditAssignmentsCtrl'
        );   
    };
  });