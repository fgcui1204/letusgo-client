'use strict';
angular.module('letusgo')
  .controller('ProductManagerCtrl', function ($location,$scope, productManagerService) {

    productManagerService.product(function (data) {
      $scope.products = data;
    });

    $scope.delete = function (barcode) {
      productManagerService.delete(barcode);
      productManagerService.product(function (data) {
        $scope.products = data;
      });
    };

    $scope.toAdd = function () {
      $location.path('/addProduct');
    };

    $scope.toUpdate = function (barcode) {
      $location.path('/updateProduct/' + barcode);
    };

  });
