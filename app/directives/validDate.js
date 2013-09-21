angular.module('SchoolApp')
  .directive('validDate', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        function isValid(input) {
          //var input = ngModelCtrl.$viewValue;
          var sep = attrs.validDate;
          var pattern = new RegExp('^([\\d]|[0][0-9]|[0,1][0,1,2])' + sep + '([0-9]|[0,1,2][0-9]|3[0,1])' + sep + '\\d{4}$');
          if(pattern.test(input) === true) {
            ngModelCtrl.$setValidity('good', true);
            return input;
          }
          else {
            ngModelCtrl.$setValidity('good', false);
            return input;
          }
        }
        ngModelCtrl.$parsers.push(isValid);
      }  
    };
  });