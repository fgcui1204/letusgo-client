'use strict';
angular.module('letusgo')
  .controller('addProductCtrl', function ($scope, fromLocal, productManagerService, sortManagerService, $location) {
    sortManagerService.getAllSorts(function (data) {
      $scope.allSorts = data;
    });
    $scope.productInfo = productManagerService.productInfo();
    $scope.addProduct = function () {
      var productInfo = $scope.productInfo;
      productManagerService.addProduct(productInfo, function (data) {
        $location.path('/productManager');
      });
    };
  });
