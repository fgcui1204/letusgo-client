'use strict';
angular.module('letusgo')
  .controller('updateSort', function ($scope,  sortManagerService, $routeParams, $location) {

    sortManagerService.getCategoryById($routeParams.id, function (data) {
      $scope.category = data;
    });

    $scope.doUpdate = function () {
      sortManagerService.doUpdate($scope.category, function () {
        $location.path('/sortManager');
      });

    };
  });
