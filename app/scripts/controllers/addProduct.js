'use strict';
angular.module('letusgo')
  .controller('addProductCtrl', function ($scope, productManagerService, sortManagerService, $location) {
    sortManagerService.getCategories(function (data) {
      $scope.categories = data;
    });
    $scope.productInfo = productManagerService.productInfo();
    $scope.addProduct = function () {
      var productInfo = $scope.productInfo;
      productManagerService.addProduct(productInfo, function (data) {
        $location.path('/productManager');
      });
    };
  });
