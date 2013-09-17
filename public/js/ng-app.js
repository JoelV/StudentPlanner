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
  .controller('PanelCtrl', function($scope, $http, $dialog) {
    $http.get('/api/course/list')
      .success(function(courseList) {
        console.log("here");
        $scope.courseList = courseList;
      });
    $scope.addClass = function() {
      $dialog.dialog().open(
        'app/templates/dialogs/addClass.html',
        'AddClassCtrl'
        );
    };
  });