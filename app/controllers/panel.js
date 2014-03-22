angular.module('SchoolApp')
  .controller('PanelCtrl', function($scope, $http, $modal, $window, $course, $mode) {
    $http.get('/api/course/list')
      .success(function(courseList) {
        $scope.courseList = courseList;
      });
    $scope.addClass = function() {
      var modalOptions = {
        templateUrl: 'app/templates/dialogs/addClass.html',
        controller: 'AddClassCtrl'
      };

      $modal.open(modalOptions).result.then(function(addCourse) {
        $http.put('/api/add/class', addCourse)
          .success(function(result) {
            //TODO alerts
            angular.extend(addCourse, {_id: result.id, _rev: result.rev});
            $scope.courseList.push(addCourse);
          })
          .error(function(err) {
            console.log(err);
          });
      });
    };
    $scope.remove = function(course, index) {
      if($window.confirm("Are you sure?")) {
        $http['delete']('/api/course/delete/' + course._id, {params: {rev: course._rev}})
          .success(function() {
            $scope.courseList.splice(index, 1);
          });
      }
    };
    $scope.addAssignments = function(course) {
      $modal.open({
        templateUrl: 'app/templates/dialogs/assignmentsForm.html',
        controller: 'AddAssignmentsCtrl',
        resolve: {
          course: function() { return course; },
          mode: function() { return "Add"; }
        }
      }).result.then(function(result){
        $http.post('/api/assignment/add', result)
          .success(function(res) {
            //TODO alerts
            console.log(res);
            //$scope.assignment.name = "";
            //$scope.assignment.date = "";
          })
          .error(function(res) {
            console.log(res);  
          });
      });
    };
  });