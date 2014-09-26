'use strict';
angular.module('letusgo')
  .controller('CartCtrl', function ($scope, fromLocal, cartService, productService) {
    // $scope.cartItems = fromLocal.getData("cartProduct");

    productService.cartItem(function (data) {
      $scope.cartItems = data;
    });
    productService.getTotalCount(function (data) {
      $scope.$parent.totalCount = data;
    });

    cartService.getTotalMoney(function (data) {
      $scope.totalMoney = data;
    });


    $scope.changeCount = function (item) {
      cartService.changeCount(item, function () {
        productService.getTotalCount(function (data) {
          $scope.$parent.totalCount = data;
        });
        cartService.getTotalMoney(function (data) {
          $scope.totalMoney = data;
        });
      });
    };
  });
