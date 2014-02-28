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