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