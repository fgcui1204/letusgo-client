'use strict';
angular.module('letusgo')
  .controller('ProCtrl', function ($scope, productService) {


    productService.product(function (data) {
      $scope.products = data;
    });

    productService.getTotalCount(function (data) {
      $scope.$parent.totalCount = data;
    });

    $scope.addToCart = function (product) {
      productService.addToCart(product, function () {
        productService.getTotalCount(function (data) {
          $scope.$parent.totalCount = data;
        });

      });
    };
  });
