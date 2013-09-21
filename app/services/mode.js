angular.module('SchoolApp')
  .factory('$mode', function() {
    var mode;
    return {
      setMode: function(m) {
        mode = m;
      },
      getMode: function() {
        return mode;
      }
    };
  });