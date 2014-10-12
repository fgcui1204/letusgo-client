'use strict';
angular.module('letusgo')
  .controller('addProductCtrl', function ($scope, productManagerService, CategoryManagerService , $location) {

    CategoryManagerService .getCategories(function (data) {
      $scope.categories = data;
    });

    $scope.productInfo = productManagerService.productInfo();

    $scope.addProduct = function () {
      productManagerService.addProduct($scope.productInfo, function () {
        $location.path('/productManager');
      });
    };
  });
