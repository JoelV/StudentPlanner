angular.module('SchoolApp')
  .controller('CalendarCtrl', function($scope) {
    $scope.eventChanged = 0;
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        //header:{
        //  left: 'month basicWeek basicDay agendaWeek agendaDay',
        //  center: 'title',
        //  right: 'today prev,next'
        //},
        //dayClick: $scope.alertEventOnClick,
        //eventDrop: $scope.alertOnDrop,
        //eventResize: $scope.alertOnResize
      }
    };
    var date = new Date();
    var m = date.getMonth();
    var y = date.getFullYear();
    var events = [ 
      {
        title: 'CPT 101 Project',
        start: new Date(y, m, 29)
      },
      { 
        title: 'CPT 102 Projecct',
        start: new Date(y, m, 1)
      },
      {
        title: 'Event1',
        start: '2013, 09, 28'
      },
    ];
    $scope.eventSources = [events];
    /*
    $scope.eventSources = [

        // your event source
        {
            events: [ // put the array in the `events` property
                {
                    title  : 'event1',
                    start  : '2013-09-01'
                },
                {
                    title  : 'event2',
                    start  : '2013-09-05',
                    end    : '2013-09-07'
                },
                {
                    title  : 'event3',
                    start  : '2013-09-09 12:30:00',
                }
            ],
            color: 'black',     // an option!
            textColor: 'yellow' // an option!
        }

        // any other event sources...

    ];
    */
  });