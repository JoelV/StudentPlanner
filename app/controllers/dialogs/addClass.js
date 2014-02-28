angular.module('SchoolApp')
  .controller('AddClassCtrl', function($scope, $http, $modalInstance, $window) {
    $scope.add = function(course) {
      course.type = "class";
      $modalInstance.close(course);
      // $http.put('/api/add/class', course)
      //   .success(function() {
      //     dialog.close(); 
      //     $window.location.href = '/panel';
      //   });
    }; 
    $scope.cancel = function() {
      $modalInstance.close();
      //$window.location.href = '/panel';
    }; 
  });