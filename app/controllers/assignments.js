angular.module('SchoolApp')
  .controller('AssignmentCtrl', function($scope, $routeParams, $http, $modal, $_) { 
                                      
    $scope.className = $routeParams.className;
    $scope.sort='date';
    $http.get('/api/assignment/list/' + $routeParams.className)
      .success(function(assignmentList) {
        $scope.assignmentList = assignmentList;
      });
    $scope.edit = function(assignment) {
      $modal.open({
        templateUrl: '../app/templates/dialogs/assignmentsForm.html',
        controller: 'EditAssignmentsCtrl',
        resolve: {
          assignment: function() { return assignment; },
          mode: function() { return 'Edit'; }
        }
        }).result.then(function(editedAssignment) {
          if(editedAssignment) {
            $http.put('/api/assignment/edit', editedAssignment).success(function(result) {
              angular.extend(editedAssignment, { _rev: result.rev });
              assignment = angular.copy(editedAssignment);
            });
          }
        });   
    };
    $scope.addAssignments = function() {
      var course = $routeParams.className;
      var courseArry = course.split('-');
      var c = {};
      c.name = courseArry[0];
      c.number = courseArry[1];
      
      $modal.open({
        templateUrl: '../app/templates/dialogs/assignmentsForm.html',
        controller: 'AddAssignmentsCtrl',
        resolve: {
          course: function() { return c; },
          mode: function() { return 'Add'; }
        }
      }).result.then(function(newAssignment) {
        if(newAssignment) {
          $http.post('/api/assignment/add', newAssignment).success(function(result) {
            angular.extend(newAssignment, { 
              _id: result.id,
              _rev: result.rev
            });
            $scope.assignmentList.push(newAssignment);
          });
        }  
      });
    };
    $scope.delete = function(assignment) {
      if(confirm('Are you sure?')) {
        $http['delete']('/api/assignment/delete/' + assignment._id, {params: {rev: assignment._rev}})
          .success(function(result) {
            $scope.assignmentList = $_.without($scope.assignmentList, assignment);
          }); 
      }  
    };
  });