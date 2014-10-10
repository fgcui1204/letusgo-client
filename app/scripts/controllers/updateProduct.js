'use strict';
angular.module('letusgo')
  .controller('updateProduct', function ($location, $scope,productManagerService, CategoryManagerService, $routeParams) {

    CategoryManagerService.getCategories(function (data) {
      $scope.categories = data;
    });
    
    productManagerService.getProductById($routeParams.barcode, function (data) {
      var item = data;
      $scope.productInfo = {'barcode': item.barcode, 'category': item.category, 'name': item.name, 'price': item.price, 'unit': item.unit};
    });

    $scope.doUpdate = function () {
      productManagerService.doUpdate($scope.productInfo, function () {
        $location.path('/productManager');
      });

    };
  });
