'use strict';
angular.module('letusgo')
  .controller('addProductCtrl', function ($scope, productManagerService, CategoryManagerService , $location) {

    CategoryManagerService .getCategories(function (data) {
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
