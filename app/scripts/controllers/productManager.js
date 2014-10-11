'use strict';
angular.module('letusgo')
  .controller('ProductManagerCtrl', function ($location,$scope, productManagerService) {

    initProducts();

    $scope.delete = function (barcode) {
      productManagerService.delete(barcode);
      initProducts();
    };

    $scope.toAdd = function () {
      $location.path('/addProduct');
    };

    $scope.toUpdate = function (barcode) {
      $location.path('/updateProduct/' + barcode);
    };

    function initProducts(){
      productManagerService.product(function (data) {
        $scope.products = data;
      });
    }
  });
