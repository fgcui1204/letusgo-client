'use strict';
angular.module('letusgo')
    .controller('OrderCtrl', function ($scope,fromLocal,cartService,productService,orderService) {

    productService.cartItem(function(data){
      $scope.orderItems = data;
      $scope.totalMoney = cartService.getTotalMoney(data);

    });
    productService.getTotalCount(function(data){
      $scope.$parent.totalCount = data;
    });
//
//        $scope.totalMoney = cartService.getTotalMoney();
//
//        $scope.remove = function(){
//            orderService.remove();
//            $scope.$parent.totalCount=productService.getTotalCount();
//
//        };
    });
