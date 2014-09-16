angular.module('ngLetusgoApp')
  .controller('updateProduct', function ($scope,fromLocal,productManagerService,$routeParams,$location) {
    $scope.allSorts = productManagerService.getAllSort();
    var item = productManagerService.getProductByName($routeParams.name);
    $scope.productInfo = {'p_sort':item[0].p_sort,p_name:item[0].p_name,p_price:item[0].p_price,p_unit:item[0].p_unit};

    $scope.doUpdate = function(){
      productManagerService.doUpdate($scope.productInfo);
      $location.path('/productManager');
    }
  });
