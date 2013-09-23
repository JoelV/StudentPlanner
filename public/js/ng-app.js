angular.module('SchoolApp', ['ui.bootstrap'])
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
    ;
    $locationProvider.html5Mode(true);
  });
angular.module('SchoolApp')
  .controller('AssignmentCtrl', function($scope, $routeParams, $http, $dialog, $mode, $assignment, 
                                         $from, $course) {
    $scope.className = $routeParams.className;
    $http.get('/api/assignment/list/' + $routeParams.className)
      .success(function(assignmentList) {
        $scope.assignmentList = assignmentList;
      });
    $scope.edit = function(assignment) {
      $mode.setMode('Edit');
      $assignment.setAssignment(assignment);
      $dialog.dialog().open(
        '../app/templates/dialogs/assignmentsForm.html',
        'EditAssignmentsCtrl'
        );   
    };
    $scope.addAssignments = function() {
      var course = $routeParams.className;
      var courseArry = course.split('-');
      var c = {};
      c.name = courseArry[0];
      c.number = courseArry[1];
      $course.setCourse(c);
      $mode.setMode('Add');
      $from.setFrom('assignments');
      $dialog.dialog().open(
        '../app/templates/dialogs/assignmentsForm.html',
        'AddAssignmentsCtrl'
        );
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
  .controller('AddAssignmentsCtrl', function($scope, dialog, $course, $http, $mode, $from, $window) {
    $scope.course = $course.getCourse();
    $scope.mode = $mode.getMode();
    $scope.close = function() {
      dialog.close();
      if($from.getFrom() === 'assignments')  
        $window.location.href = '/assignments/' + $scope.course.name + '-' + $scope.course.number;
    };

    $scope.add = function(assignment) {
      assignment.course = {};
      assignment.course.name = $scope.course.name;
      assignment.course.number = $scope.course.number; 
      assignment.type = 'assignment';
      var date = moment(assignment.date, 'MM-DD-YYYY').toISOString();
      assignment.date = date;
      $http.put('/api/assignment/add', assignment)
        .success(function() {
          $scope.assignment.name = "";
          $scope.assignment.date = "";
        });
    };
  });
angular.module('SchoolApp')
  .controller('AddClassCtrl', function($scope, $http, dialog, $window) {
    $scope.add = function(course) {
      course.type = "class";
      $http.put('/api/add/class', course)
        .success(function() {
          dialog.close(); 
          $window.location.href = '/panel';
        });
    }; 
    $scope.cancel = function() {
      dialog.close();
      $window.location.href = '/panel';
    }; 
  });
angular.module('SchoolApp')
  .controller('EditAssignmentsCtrl', function($scope, dialog, $mode, $assignment, $http, $window) {
    $scope.mode = $mode.getMode();
    $scope.assignment = $assignment.getAssignment();

    $scope.close = function() {
      dialog.close();
    };

    //save button
    $scope.add = function(assignment) {
      //var date = moment(assignment.date).toISOString();
      //assignment.date = date;
      $http.put('/api/assignment/edit', assignment)
        .success(function() {
          dialog.close();
          $window.location.href = '/assignments/' + $scope.assignment.course.name + '-' + $scope.assignment.course.number;
        });
    };
  });
angular.module('SchoolApp')
  .controller('PanelCtrl', function($scope, $http, $dialog, $window, $course, $mode) {
    $http.get('/api/course/list')
      .success(function(courseList) {
        $scope.courseList = courseList;
      });
    $scope.addClass = function() {
      $dialog.dialog().open(
        'app/templates/dialogs/addClass.html',
        'AddClassCtrl'
        );
    };
    $scope.remove = function(course, index) {
      if(confirm("Are you sure?")) {
        $http['delete']('/api/course/delete/' + course._id, {params: {rev: course._rev}})
          .success(function() {
            $scope.courseList.splice(index, 1);
          });
      }
    };
    $scope.addAssignments = function(course) {
      $course.setCourse(course);
      $mode.setMode('Add');
      $dialog.dialog().open(
        'app/templates/dialogs/assignmentsForm.html',
        'AddAssignmentsCtrl'
        );
    };
    /*
    $scope.listCourse = function(course) {
      console.log('here');  
    };
    */
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