angular.module('SchoolApp')
  .controller('AssignmentCtrl', function($scope, $routeParams, $http, $dialog, $mode, $assignment, 
                                         $from, $course) {
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
    $scope.addAssignments = function() {
      var course = $routeParams.className;
      var courseArry = course.split('-');
      var c = {};
      c.name = courseArry[0];
      c.number = courseArry[1];
      $course.setCourse(c);
      $mode.setMode('Add');
      $from.setFrom('assignments');
      $dialog.dialog().open(
        '../app/templates/dialogs/assignmentsForm.html',
        'AddAssignmentsCtrl'
        );
    };
    $scope.delete = function(assignment, index) {
      if(confirm('Are you sure?')) {
        $http['delete']('/api/assignment/delete/' + assignment._id, {params: {rev: assignment._rev}})
          .success(function() {
            $scope.assignmentList.splice(index, 1);
          }); 
      }  
    };
  });