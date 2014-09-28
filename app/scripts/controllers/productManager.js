'use strict';
angular.module('letusgo')
  .controller('ProductManagerCtrl', function ($scope, productManagerService) {

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
      productManagerService.toAdd();
    };

    $scope.toUpdate = function (barcode) {
      productManagerService.toUpdate(barcode);
    };

  });
