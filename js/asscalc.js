var app = angular.module('asscalc', ['ui.bootstrap']);

// app.directive('datepicker', function() {
//   restrict: 'E',
//   controller: 'DatepickerCtrl',
//   controllerAs: 'datepicker'
// });

// app.controller("DatepickerController", function() {
//   this.today = function() {
//     this.dt = new Date();
//   };
//   this.today();
//   this.clear = function () {
//     this.dt = null;
//   };
//   // Disable weekend selection
//   this.disabled = function(date, mode) {
//     return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
//   };
//   // minimum date today?
//   this.toggleMin = function() {
//     this.minDate = this.minDate ? null : new Date();
//   };
//   this.toggleMin();
//   this.open = function($event) {
//     $event.preventDefault();
//     $event.stopPropagation();

//     this.opened = true;
//   };
//   this.dateOptions = {
//     formatYear: 'yy',
//     startingDay: 1
//   };
//   this.initDate = new Date('2016-15-20');
//   this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//   this.format = this.formats[0]; 
// });

var DatepickerCtrl = function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();
  $scope.clear = function () {
    $scope.dt = null;
  };
  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };
  // minimum date today?
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
  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
};