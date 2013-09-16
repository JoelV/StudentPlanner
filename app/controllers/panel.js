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