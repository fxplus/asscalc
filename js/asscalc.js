
  var app = angular.module('asscalc', ['ui.bootstrap']);

  app.controller("HelloWorldCtrl", function () {
    this.message = 'Hello World';
  });

  app.controller("FooBarCtrl", function () {
    this.bar = 'bar';
  });

  app.controller("DatepickerCtrl", function ($scope) {
    this.today = function() {
      this.dt = new Date();
    };
    this.nweeks = function(n) {
      today = new Date();
      this.dt = new Date(today.getTime() + n * 7 * 24 * 60 * 60 * 1000);
    };
    if ($scope.datetype == 'start') { this.today();}
    else { this.nweeks(4); }

    this.clear = function () {
      this.dt = null;
    };
    // Disable weekend selection
    this.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };
    // minimum date today?
    this.toggleMin = function() {
      this.minDate = this.minDate ? null : new Date();
    };
    this.toggleMin();
    this.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      this.opened = true;
    };
    this.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    this.initDate = new Date('2016-15-20');
    this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    this.format = this.formats[0];
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
  // var DatepickerCtrl = function ($scope) {
  //   $scope.today = function() {
  //     $scope.dt = new Date();
  //   };
  //   $scope.today();
  //   $scope.clear = function () {
  //     $scope.dt = null;
  //   };
  //   // Disable weekend selection
  //   $scope.disabled = function(date, mode) {
  //     return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  //   };
  //   // minimum date today?
  //   $scope.toggleMin = function() {
  //     $scope.minDate = $scope.minDate ? null : new Date();
  //   };
  //   $scope.toggleMin();
  //   $scope.open = function($event) {
  //     $event.preventDefault();
  //     $event.stopPropagation();

  //     $scope.opened = true;
  //   };
  //   $scope.dateOptions = {
  //     formatYear: 'yy',
  //     startingDay: 1
  //   };
  //   $scope.initDate = new Date('2016-15-20');
  //   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  //   $scope.format = $scope.formats[0];
  // };