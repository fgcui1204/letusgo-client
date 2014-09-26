'use strict';
angular.module('letusgo')
  .controller('updateSort', function ($scope, fromLocal, sortManagerService, $routeParams, $location) {

    sortManagerService.getSortById($routeParams.sid, function (data) {
      $scope.sort = data;
    });

    $scope.doUpdate = function () {
      sortManagerService.doUpdate($scope.sort, function () {
        $location.path('/sortManager');
      });

    };
  });
