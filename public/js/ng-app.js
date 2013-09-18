angular.module('SchoolApp', ['ui.bootstrap'])
  .config(function($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider
    .when('/panel', {
      controller: 'PanelCtrl',
      templateUrl: '/app/templates/panel.html'
    })
    ;
    $locationProvider.html5Mode(true);
  });
angular.module('SchoolApp')
  .controller('AddAssignmentsCtrl', function($scope, dialog, $course, $http) {
    $scope.course = $course.getCourse();
    $scope.close = function() {
      dialog.close();
    };

    $scope.add = function(assignment) {
      console.log("here");
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
angular.module('SchoolApp')
  .controller('AddClassCtrl', function($scope, $http, dialog, $window) {
    $scope.add = function(course) {
      course.type = "class";
      $http.put('/api/add/class', course)
        .success(function() {
          dialog.close(); 
          $window.location.href = '/panel';
        });
    }; 
    $scope.cancel = function() {
      dialog.close();
      $window.location.href = '/panel';
    }; 
  });
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
angular.module('SchoolApp')
  .factory('$course', function() {
    var course;
    return {
      setCourse: function(c) {
        course = c;
      },
      getCourse: function() {
        return course;
      }
    };
  });