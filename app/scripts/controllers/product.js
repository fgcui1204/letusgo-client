'use strict';
angular.module('letusgo')
    .controller('ProCtrl', function ($scope,fromLocal,productService) {


        productService.product(function(data){
          $scope.products = data;
        });

       // $scope.$parent.totalCount = productService.getTotalCount();

        $scope.addToCart = function(product){
            productService.addToCart(product);
            //$scope.$parent.totalCount = productService.getTotalCount();
        };
    });
