angular.module('SchoolApp')
  .directive('validDate', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {

      }  
    };
  });