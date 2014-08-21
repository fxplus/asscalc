
  var app = angular.module('asscalc', ['ui.bootstrap']);

  $jsonpath = 'services/tasks.json';

  app.controller("DatepickerCtrl", function ($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.nweeks = function(n) {
      today = new Date();
      $scope.dt = new Date(today.getTime() + n * 7 * 24 * 60 * 60 * 1000);
    };
    $scope.isStart = function() {
      return (($scope.datetype == 'start') ? true : false);
    };
    $scope.clear = function () {
      $scope.dt = null;
    };
    $scope.updateSchedule = function () {
      (($scope.isStart()) ? $scope.$parent.startdate = $scope.dt : $scope.$parent.enddate = $scope.dt );
    };
    // // Disable weekend selection
    // $scope.disabled = function(date, mode) {
    //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    // };
    // minimum date today
    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    if ( $scope.datetype == 'start' ) { $scope.today(); $scope.$parent.startdate = $scope.dt;}
    else { $scope.nweeks(4); $scope.$parent.enddate = $scope.dt;}

    // $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  });
  
  app.controller("ScheduleCtrl", function ($scope, $http, $log, $location) {
    // initialise
    $scope.startdate = null;
    $scope.enddate = null;
    $scope.datescollected = false;
    $scope.tasks = [];
    $scope.totalrelativeduration = 0;
    $scope.duration = 0;
    $scope.starttime = 0;
    $scope.endtime = 0;
    query = $location.search();

    $scope.createschedule = function() {
      $scope.datescollected = true;
      $scope.starttime = (!$scope.starttime)? $scope.startdate.getTime(): $scope.starttime;
      $scope.endtime = (!$scope.endtime)? $scope.enddate.getTime(): $scope.endtime;
      $location.search('start', $scope.starttime);
      $location.search('end', $scope.endtime);
      $scope.duration = $scope.endtime - $scope.starttime;
      timeunit = $scope.duration / $scope.totalrelativeduration;
      log = [];
      timelapsed = 0;
      angular.forEach($scope.tasks, function(task) {
        tasktime = task.relativeduration * timeunit;
        task.date = new Date($scope.starttime + timelapsed);
        console.log(task.date);
        timelapsed += tasktime;
      }, log);
    }
    $scope.clearDates = function() {
      $location.search('start', null);
      $location.search('end', null);
      $scope.starttime = null;
      $scope.endtime = null;
      $scope.datescollected = false;
    }


    if (query.start && query.end) {
      $scope.starttime = query.start;
      $scope.endtime = query.end;
      $scope.createschedule();
    }
    // get tasks (json)
    var schedule = $scope; // to use within $http
    $http.get($jsonpath).success(function(data) {
      schedule.tasks = data;
      log = [];
      angular.forEach(schedule.tasks, function(task) {
        schedule.totalrelativeduration += task.relativeduration;
        task.isCollapsed = 1;
      }, log);
    });
    console.log($location.search());


  });

  app.directive("assignmentDate", function() {
    return {
      restrict: 'E',
      scope: {
        datetype: "@"
      },
      templateUrl: 'js/assignment-date.html',
      controller: 'DatepickerCtrl',
      controllerAs: 'dp',
      link: function(scope, element, attributes){
        // console.log(attributes.datetype);
      }
    }
  });

  app.filter('capitalize', function() {
   return function(input, scope) {
   if (input!=null)
     input = input.toLowerCase();
     return input.substring(0,1).toUpperCase()+input.substring(1);
   }
  });