'use strict';
angular.module('letusgo')
  .controller('OrderCtrl', function ($scope, $location, cartService, productService, orderService) {

    productService.cartItem(function (data) {
      $scope.orderItems = data;
    });

    productService.getTotalCount(function (data) {
      $scope.$parent.totalCount = data;
    });

    cartService.getTotalMoney(function (data) {
      $scope.totalMoney = data;
    });
        $scope.remove = function(){
            orderService.remove(function(data){
              productService.getTotalCount(function (data) {
                $scope.$parent.totalCount = data;
                $location.path('/homePage').replace();
              });
            });


        };
  });
