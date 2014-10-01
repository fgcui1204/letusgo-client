'use strict';
angular.module('letusgo')
  .controller('sortManagerCtrl', function ($scope, $location, sortManagerService,productManagerService) {
    sortManagerService.getCategories(function (data) {
      $scope.categories = data;
    });

    $scope.add = function () {
      var category = sortManagerService.category();
      category.name = $scope.name;
      sortManagerService.add(category, function (data) {
        $location.path('/sortManager');
      });
    };


    $scope.delete = function (id) {
      productManagerService.judgeIfHaveItems(id,function(data){
        if(data){
          sortManagerService.delete(id);
          sortManagerService.getCategories(function (data) {
            $scope.categories = data;
          });
        }else{
          alert('该分类下有商品，不能删除');
        }
      });

    };
    $scope.toUpdate = function (category) {
      $location.path('/updateSort/' + category.id);
    };
  });
