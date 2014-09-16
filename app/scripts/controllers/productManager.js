angular.module('ngLetusgoApp')
  .controller('ProductManagerCtrl', function ($scope,fromLocal,productManagerService) {

    $scope.products = fromLocal.getData("allProduct");;

    $scope.delete = function(p_name){
      productManagerService.delete(p_name);
      $scope.products = fromLocal.getData("allProduct");;
    };

    $scope.toAdd = function(){
      productManagerService.toAdd();
    };

    $scope.toUpdate = function(product){
      productManagerService.toUpdate(product);

    };

  });
