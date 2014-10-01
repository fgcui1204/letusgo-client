'use strict';
angular.module('letusgo')
  .controller('updateSort', function ($scope,  sortManagerService, $routeParams, $location) {

    sortManagerService.getCategoryById($routeParams.id, function (data) {
      $scope.category = data;
    });

    $scope.doUpdate = function () {
      sortManagerService.doUpdate($scope.sort, function () {
        $location.path('/sortManager');
      });

    };
  });
