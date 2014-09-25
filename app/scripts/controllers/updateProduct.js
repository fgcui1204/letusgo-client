'use strict';
angular.module('letusgo')
  .controller('updateProduct', function ($scope,fromLocal,productManagerService,$routeParams,$location) {

    productManagerService.getAllSorts(function(data){
      $scope.allSorts = data;
    });
    productManagerService.getProductById($routeParams.barcode,function(data){
      var item = data;
      $scope.productInfo = {'barcode':item.barcode,'productSort':item.productSort.sname,productName:item.productName,productPrice:item.productPrice,productUnit:item.productUnit};
    });
//
//    $scope.doUpdate = function(){
//      productManagerService.doUpdate($scope.productInfo);
//      $location.path('/productManager');
//    };
  });
