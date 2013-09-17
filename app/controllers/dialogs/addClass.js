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