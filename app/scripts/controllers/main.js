'use strict';

angular.module('letusgo')
  .controller('MainCtrl', function ($scope, productService) {
//
//    productService.setSortToLocal();
//    productService.setToLocal();

    //$scope.totalCount = productService.getTotalCount();
    productService.getTotalCount(function(data){
      $scope.$parent.totalCount = data;
    });
  });
