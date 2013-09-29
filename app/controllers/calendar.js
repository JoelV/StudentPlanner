angular.module('SchoolApp')
  .controller('CalendarCtrl', function($scope, $http) {
    function buildEventsArray() {
      var assignmentEvents = [];
      $http.get('/api/assignments/all')
        .success(function(assignments) {
          $scope.assignments = _.pluck(assignments.rows, 'value');
          _.each($scope.assignments, function(assignment, index) {
            assignmentEvents.push({
              title: assignment.course.name + '-' + assignment.course.number + ' ' + assignment.name,
              start: assignment.date
            });
          });
        });
      return assignmentEvents;      
    }
    $scope.eventChanged = 0;
    $scope.uiConfig = {
      calendar:{
        height: 600,
        editable: false,
        header:{
          left: 'month basicWeek basicDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };
    var events = buildEventsArray();
    $scope.eventSources=[events];
  });