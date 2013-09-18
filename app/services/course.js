angular.module('SchoolApp')
  .factory('$course', function() {
    var course;
    return {
      setCourse: function(c) {
        course = c;
      },
      getCourse: function() {
        return course;
      }
    };
  });