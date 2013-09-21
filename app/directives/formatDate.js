angular.module('SchoolApp')
  .directive('formatDate', function() {
    function replace(array, pos, char) {
      if(array[pos] !== char) array.splice(pos, 0, char);
    }
    function replaceInput(str, ngModelCtrl) {
      ngModelCtrl.$setViewValue(str);
      ngModelCtrl.$render(); 
    }
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        function formatDate(input) {
          var sep = attrs.formatDate;
          if(typeof input === 'undefined') return input;
          if(input.length === 8 && (input.charAt(2) !== sep || input.charAt(5) !== sep)) {
            var inputArray = input.split('');
            replace(inputArray, 2, sep);
            replace(inputArray, 5, sep);
            var output = inputArray.join('');
            if(input !== output) {
              replaceInput(output, ngModelCtrl);
            }
            return output;
          }
          else return input;
        }
        ngModelCtrl.$parsers.push(formatDate);
      }
    };
  });