angular.module('SchoolApp')
  .factory('$assignment', function() {
    var assignment;
    return {
      setAssignment: function(a) {
        assignment = a; 
      },
      getAssignment: function() {
        return assignment;
      } 
    };
  });