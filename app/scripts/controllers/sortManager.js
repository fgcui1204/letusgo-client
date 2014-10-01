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


    $scope.delete = function (sid) {
      productManagerService.judgeIfHaveItems(sid,function(data){
        if(data){
          sortManagerService.delete(sid);
          sortManagerService.getAllSorts(function (data) {
            $scope.sorts = data;
          });
        }else{
          alert('该分类下有商品，不能删除');
        }
      });

    };
    $scope.toUpdate = function (sort) {
      $location.path('/updateSort/' + sort.sid);
    };
  });
