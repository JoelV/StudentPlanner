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
  .controller('AddClassCtrl', function($scope, $http, dialog) {
    $scope.add = function(course) {
      course.type = "class";
      $http.put('/api/add/class', course)
        .success(function() {
          dialog.close(); 
        });
    };  
  });
angular.module('SchoolApp')
  .controller('PanelCtrl', function($scope, $http, $dialog) {
    $http.get('/api/classes')
      .success(function(classes) {
        $scope.classes = classes;
      });
    $scope.addClass = function() {
      $dialog.dialog().open(
        'app/templates/dialogs/addClass.html',
        'AddClassCtrl'
        );
    };
  });