angular.module('SchoolApp', ['ui.bootstrap'])
  .config(function($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider
    .when('/panel', {
      controller: 'PanelCtrl',
      templateUrl: '/app/templates/panel.html'
    })
    ;
    $locationProvider.html5Mode(true);
  });
angular.module('SchoolApp')
  .controller('AddAssignmentsCtrl', function($scope, dialog, $course, $http) {
    $scope.course = $course.getCourse();
    $scope.close = function() {
      dialog.close();
    };

    $scope.add = function(assignment) {
      assignment.course = {};
      assignment.course.name = $scope.course.name;
      assignment.course.number = $scope.course.number; 
      assignment.type = 'assignment';
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
  .controller('PanelCtrl', function($scope, $http, $dialog, $window, $course) {
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
      $dialog.dialog().open(
        'app/templates/dialogs/addAssignments.html',
        'AddAssignmentsCtrl'
        );
    };
  });
angular.module('SchoolApp')
  .directive('formatDate', function() {
    function replace(array, pos, char) {
      if(array[pos] !== char) array.splice(pos, 0, char);
    }
    function replaceInput(str, modelCtrl) {
      modelCtrl.$setViewValue(str);
      modelCtrl.$render(); 
    }
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        function formatDate(input) {
          //console.log(sep);
          var sep = attrs.formatDate;
          if(typeof input === 'undefined') return input;
          if(input.length === 8 && (input.charAt(2) !== sep || input.charAt(5) !== sep)) {
            var inputArray = input.split('');
            replace(inputArray, 2, sep);
            replace(inputArray, 5, sep);
            var output = inputArray.join('');
            if(input !== output) {
              replaceInput(output, modelCtrl);
            }
            return output;
          }
          else return input;
        }
        modelCtrl.$parsers.push(formatDate);
        formatDate(attrs.ngModel);
      }
    };
  });
angular.module('SchoolApp')
  .directive('validDate', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        function isValid(input) {
          var sep = attrs.validDate;
          var pattern = new RegExp('^([\\d]|[0][0-9]|[0,1][0,1,2])' + sep + '([0-9]|[0,1,2][0-9]|3[0,1])' + sep + '\\d{4}$');
          if(pattern.test(input) === true) {
            modelCtrl.$setValidity('good', true);
            return input;
          }
          else {
            modelCtrl.$setValidity('good', false);
            return input;
          }
        }
        modelCtrl.$parsers.push(isValid);
        isValid(attrs.ngModel);
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