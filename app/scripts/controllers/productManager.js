'use strict';
angular.module('letusgo')
  .controller('ProductManagerCtrl', function ($scope,fromLocal,productManagerService) {

    $scope.products = fromLocal.getData('allProduct');

    $scope.delete = function(barcode){
      productManagerService.delete(barcode);
      $scope.products = fromLocal.getData('allProduct');
    };

    $scope.toAdd = function(){
      productManagerService.toAdd();
    };

    $scope.toUpdate = function(product){
      productManagerService.toUpdate(product);

    };

  });
