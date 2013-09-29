angular.module('SchoolApp')
  .controller('WeekCtrl', function($scope) {
    function numFromSunday(now) {
      var compute = {
        Sunday: 0,
        Monday: -1,
        Tuesday: -2,
        Wednesday: -3,
        Thursday: -4,
        Friday: -5,
        Saturday: -6
      };
      var day = now.format('dddd');
      return compute[day]; 
    }
    function fillWeekArray() {
      var now = moment(); 
      var minus = numFromSunday(now);
      var sunday = now.add('days', minus);
      var week = _.times(7, function(i) {
        var day = moment(sunday);
        sunday.add('days', 1);
        return day;
      });
      return week; 
    }
    $scope.week = fillWeekArray(); 
  });