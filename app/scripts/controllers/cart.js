'use strict';
angular.module('letusgo')
  .controller('CartCtrl', function ($scope,cartService, productService) {

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
