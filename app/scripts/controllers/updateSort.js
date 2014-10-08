'use strict';
angular.module('letusgo')
  .controller('updateSort', function ($scope,  CategoryManagerService, $routeParams, $location) {

    CategoryManagerService.getCategoryById($routeParams.id, function (data) {
      $scope.category = data;
    });

    $scope.doUpdate = function () {
      CategoryManagerService.doUpdate($scope.category, function () {
        $location.path('/sortManager');
      });

    };
  });
