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