'use strict';
angular.module('letusgo')
  .controller('sortManagerCtrl', function ($scope, fromLocal, $location, sortManagerService) {
    $scope.sorts = sortManagerService.getAllSorts();
    $scope.addSort = function () {
      var sort = sortManagerService.sortInfo();
      sort.sname = $scope.sname;
      sortManagerService.addSort(sort);
      $location.path('/sortManager');
    };

    $scope.delete = function (sort) {
      sortManagerService.delete(sort);
      $scope.sorts = sortManagerService.getAllSorts();
    };
    $scope.toUpdate = function (sort) {
      sortManagerService.toUpdate(sort);

    };
  });
