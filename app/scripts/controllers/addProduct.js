
angular.module('ngLetusgoApp')
  .controller('addProductCtrl', function ($scope,fromLocal,productManagerService,$location) {
    $scope.allSorts = productManagerService.getAllSort();

    $scope.productInfo = productManagerService.productInfo();
    $scope.addProduct = function(){
      var productInfo = $scope.productInfo;
      productManagerService.addProduct(productInfo);

      $location.path('/productManager');
    }
  });
