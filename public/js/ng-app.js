angular.module('SchoolApp', ['ui.bootstrap', 'ui.calendar', 'ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider
    .when('/panel', {
      controller: 'PanelCtrl',
      templateUrl: '/app/templates/panel.html'
    })
    .when('/assignments/:className', {
      controller: 'AssignmentCtrl',
      templateUrl: '/app/templates/assignments.html' 
    })
    .when('/' , {
      controller: 'CalendarCtrl',
      templateUrl: '/app/templates/calendar.html'
    })
    ;
    $locationProvider.html5Mode(true);
  });
angular.module('SchoolApp')
  .controller('AssignmentCtrl', function($scope, $routeParams, $http, $modal) { 
                                      
    $scope.className = $routeParams.className;
    $scope.sort='date';
    $http.get('/api/assignment/list/' + $routeParams.className)
      .success(function(assignmentList) {
        $scope.assignmentList = assignmentList;
      });
    $scope.edit = function(assignment) {
      $modal.open({
        templateUrl: '../app/templates/dialogs/assignmentsForm.html',
        controller: 'EditAssignmentsCtrl',
        resolve: {
          assignment: function() { return assignment; },
          mode: function() { return 'Edit'; }
        }
        }).result.then(function(editedAssignment) {
          if(editedAssignment) {
            $http.put('/api/assignment/edit', editedAssignment).success(function(result) {
              angular.extend(editedAssignment, { _rev: result.rev });
              assignment = angular.copy(editedAssignment);
            });
          }
        });   
    };
    $scope.addAssignments = function() {
      var course = $routeParams.className;
      var courseArry = course.split('-');
      var c = {};
      c.name = courseArry[0];
      c.number = courseArry[1];
      
      $modal.open({
        templateUrl: '../app/templates/dialogs/assignmentsForm.html',
        controller: 'AddAssignmentsCtrl',
        resolve: {
          course: function() { return c; },
          mode: function() { return 'Add'; }
        }
      });
    };
    $scope.delete = function(assignment, index) {
      if(confirm('Are you sure?')) {
        $http['delete']('/api/assignment/delete/' + assignment._id, {params: {rev: assignment._rev}})
          .success(function() {
            $scope.assignmentList.splice(index, 1);
          }); 
      }  
    };
  });
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
angular.module('SchoolApp')
  .controller('AddAssignmentsCtrl', function($scope, $modalInstance, course, mode, $from, $window) {
    $scope.mode = mode;
    $scope.close = function() {
      $modalInstance.close();
      if($from.getFrom() === 'assignments')  
        $window.location.href = '/assignments/' + $scope.course.name + '-' + $scope.course.number;
    };

    $scope.add = function(assignment) {
      assignment.course = {};
      assignment.course.name = course.name;
      assignment.course.number = course.number; 
      assignment.type = 'assignment';
      var date = moment(assignment.date, 'MM-DD-YYYY').toISOString();
      assignment.date = date;
      $modalInstance.close(assignment);
    };
  });
angular.module('SchoolApp')
  .controller('AddClassCtrl', function($scope, $http, $modalInstance, $window) {
    $scope.add = function(course) {
      course.type = "class";
      $modalInstance.close(course);
      // $http.put('/api/add/class', course)
      //   .success(function() {
      //     dialog.close(); 
      //     $window.location.href = '/panel';
      //   });
    }; 
    $scope.cancel = function() {
      $modalInstance.close();
      //$window.location.href = '/panel';
    }; 
  });
angular.module('SchoolApp')
  .controller('EditAssignmentsCtrl', function($scope, $modalInstance, mode, assignment, $http, $window) {
    $scope.mode = mode;
    $scope.assignment = assignment;

    $scope.close = function() {
      $modalInstance.close();
    };

    //save button
    $scope.add = function(assignment) {
      $modalInstance.close(assignment);
    };
  });
angular.module('SchoolApp')
  .controller('PanelCtrl', function($scope, $http, $modal, $window, $course, $mode) {
    $http.get('/api/course/list')
      .success(function(courseList) {
        $scope.courseList = courseList;
      });
    $scope.addClass = function() {
      var modalOptions = {
        templateUrl: 'app/templates/dialogs/addClass.html',
        controller: 'AddClassCtrl'
      };

      $modal.open(modalOptions).result.then(function(addCourse) {
        $http.put('/api/add/class', addCourse)
          .success(function(result) {
            //TODO alerts
            angular.extend(addCourse, {_id: result.id, _rev: result.rev});
            $scope.courseList.push(addCourse);
          })
          .error(function(err) {
            console.log(err);
          });
      });
    };
    $scope.remove = function(course, index) {
      if($window.confirm("Are you sure?")) {
        $http['delete']('/api/course/delete/' + course._id, {params: {rev: course._rev}})
          .success(function() {
            $scope.courseList.splice(index, 1);
          });
      }
    };
    $scope.addAssignments = function(course) {
      $modal.open({
        templateUrl: 'app/templates/dialogs/assignmentsForm.html',
        controller: 'AddAssignmentsCtrl',
        resolve: {
          course: function() { return course; },
          mode: function() { return "Add"; }
        }
      }).result.then(function(result){
        $http.post('/api/assignment/add', result)
          .success(function(res) {
            //TODO alerts
            console.log(res);
            //$scope.assignment.name = "";
            //$scope.assignment.date = "";
          })
          .error(function(res) {
            console.log(res);  
          });
      });
    };
  });
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
angular.module('SchoolApp')
  .directive('validDate', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        function isValid(input) {
          //var input = ngModelCtrl.$viewValue;
          var sep = attrs.validDate;
          var pattern = new RegExp('^([\\d]|[0][0-9]|[0,1][0,1,2])' + sep + '([0-9]|[0,1,2][0-9]|3[0,1])' + sep + '\\d{4}$');
          if(pattern.test(input) === true) {
            ngModelCtrl.$setValidity('good', true);
            return input;
          }
          else {
            ngModelCtrl.$setValidity('good', false);
            return input;
          }
        }
        ngModelCtrl.$parsers.push(isValid);
      }  
    };
  });
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