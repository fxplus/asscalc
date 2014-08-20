
  var app = angular.module('asscalc', ['ui.bootstrap']);

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
  
  app.controller("ScheduleCtrl", function ($scope, $http, $log) {
    // initialise
    this.startdate = null;
    this.enddate = null;
    this.datescollected = false;
    var schedule = this; // to use within $http
    this.tasks = [];
    this.totalduration = 0;  
    // get tasks (json)
    $http.get('tasks.json').success(function(data) {
      schedule.tasks = data;
      log = [];
      angular.forEach(schedule.tasks, function(task) {
        schedule.totalduration += task.duration;
      }, log);
      
    });
    this.createschedule = function() {
      console.log('create a schedule');
      this.datescollected = true;
      console.log(this.totalduration);
      console.log(this.tasks);
    }

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