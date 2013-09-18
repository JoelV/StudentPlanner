angular.module('SchoolApp')
  .controller('PanelCtrl', function($scope, $http, $dialog, $window, $course) {
    $http.get('/api/course/list')
      .success(function(courseList) {
        $scope.courseList = courseList;
      });
    $scope.addClass = function() {
      $dialog.dialog().open(
        'app/templates/dialogs/addClass.html',
        'AddClassCtrl'
        );
    };
    $scope.remove = function(course, index) {
      if(confirm("Are you sure?")) {
        $http['delete']('/api/course/delete/' + course._id, {params: {rev: course._rev}})
          .success(function() {
            $scope.courseList.splice(index, 1);
          });
      }
    };
    $scope.addAssignments = function(course) {
      $course.setCourse(course);
      $dialog.dialog().open(
        'app/templates/dialogs/addAssignments.html',
        'AddAssignmentsCtrl'
        );
    };
  });