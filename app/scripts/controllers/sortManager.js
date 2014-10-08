'use strict';
angular.module('letusgo')
  .controller('CategoryManagerCtrl', function ($scope, $location, CategoryManagerService,productManagerService) {
    CategoryManagerService.getCategories(function (data) {
      $scope.categories = data;
    });

    $scope.add = function () {
      var category = CategoryManagerService.category();
      category.name = $scope.name;
      CategoryManagerService.add(category, function (data) {
        $location.path('/sortManager');
      });
    };


    $scope.delete = function (id) {
      productManagerService.judgeIfHaveItems(id,function(data){
        if(data){
          CategoryManagerService.delete(id);
          CategoryManagerService.getCategories(function (data) {
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
