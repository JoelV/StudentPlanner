app.controller('CalendarCtrl', function($scope, $http, $modal) {
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

    var addAssignment = function(date, allDay, jsEvent, view) {
      var config = {
        templateUrl: '/app/templates/dialogs/addAssignmentsForm.html',
        controller: 'AddAssignmentsFormCtrl', 
        resolve: {
          date: function() { return date; }
        }  
      };
      $modal.open(config).result.then(function(assignment) {
        if(assignment) {
          $http.post('/api/assignment/add', assignment).success(function(result) {
            angular.extend(assignment, { 
              _id: result.id,
              _rev: result.rev
            });
          });
          events.push({
            title: 'Course: ' + assignment.name,
            start: assignment.date || assignment.time,
            allDay: false
          });
        }
      });
    };

    $scope.uiConfig = {
      calendar:{
        height: 600,
        editable: false,
        header:{
          left: 'month basicWeek basicDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: addAssignment,
        eventClick: function(calEvent, jsEvent, view) {
          console.log("calEvent:", calEvent);
          alert('Event: ' + calEvent.title);
          alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          alert('View: ' + view.name);

          // change the border color just for fun
          //$(this).css('border-color', 'red');

        }
      }
    };
    var events = buildEventsArray();
    $scope.eventSources=[events];
  });