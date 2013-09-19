angular.module('SchoolApp')
  .directive('formatDate', function() {
    function replace(array, pos, char) {
      if(array[pos] !== char) array.splice(pos, 0, char);
    }
    function replaceInput(str, modelCtrl) {
      modelCtrl.$setViewValue(str);
      modelCtrl.$render(); 
    }
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        function formatDate(input) {
          //console.log(sep);
          var sep = attrs.formatDate;
          if(typeof input === 'undefined') return input;
          if(input.length === 8 && (input.charAt(2) !== sep || input.charAt(5) !== sep)) {
            var inputArray = input.split('');
            replace(inputArray, 2, sep);
            replace(inputArray, 5, sep);
            var output = inputArray.join('');
            if(input !== output) {
              replaceInput(output, modelCtrl);
            }
            return output;
          }
          else return input;
        }
        modelCtrl.$parsers.push(formatDate);
        formatDate(attrs.ngModel);
      }
    };
  });