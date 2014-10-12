'use strict';
angular.module('letusgo')
  .controller('OrderCtrl', function ($scope, $location, cartService, productService, orderService) {

    function initTotalCount(){
      productService.getTotalCount(function (data) {
        $scope.$parent.totalCount = data;
      });
    }

    productService.cartItem(function (data) {
      $scope.orderItems = data;
    });

    initTotalCount();

    cartService.getTotalMoney(function (data) {
      $scope.totalMoney = data;
    });
        $scope.remove = function(){
            orderService.remove(function(data){
              initTotalCount();
            });
          $location.path('/homePage').replace();
        };
  });
