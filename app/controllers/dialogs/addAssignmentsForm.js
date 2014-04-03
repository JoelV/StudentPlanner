app.controller('AddAssignmentsFormCtrl', function($scope, $modalInstance, date, $http, $_, $moment) {
  $scope.dateStr = $moment(date).format('MM/DD/YYYY');
  $http.get('/api/course/list').success(function(results) {
    $scope.courseList = results;
  });


  function buildEventTime(tempDate) {
    var momentDate = $moment(tempDate);
    var hr = momentDate.hour();
    var min = momentDate.minute();
    return moment(date).hour(hr).minute(min).toDate();
  }

  $scope.save = function(assignment) {
    assignment.time = buildEventTime(assignment.time);
    $modalInstance.close(assignment);
  };

  $scope.cancel = function() {
    $modalInstance.close();
  };
});