'use strict';
angular.module('letusgo')
  .controller('ProductManagerCtrl', function ($scope,fromLocal,productManagerService) {

    productManagerService.product(function(data){
      $scope.products = data;
    });

    $scope.delete = function(barcode){
      productManagerService.delete(barcode);
      productManagerService.product(function(data){
        $scope.products = data;
      });
    };

//    $scope.delete = function(barcode){
//      productManagerService.delete(barcode);
//      $scope.products = fromLocal.getData('allProduct');
//    };
//
    $scope.toAdd = function(){
      productManagerService.toAdd();
    };
//
    $scope.toUpdate = function(barcode){
      productManagerService.toUpdate(barcode);
    };

  });
