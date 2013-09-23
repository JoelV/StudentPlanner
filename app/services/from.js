angular.module('SchoolApp')
  .factory('$from', function() {
    var from;
    return {
      setFrom: function(f) {
        from = f;
      },
      getFrom: function() {
        return from;
      }
    };
  });