'use strict';
angular.module('letusgo')
  .controller('sortManagerCtrl', function ($scope, $location, sortManagerService,productManagerService) {
    sortManagerService.getAllSorts(function (data) {
      $scope.sorts = data;
    });

    $scope.addSort = function () {
      var sort = sortManagerService.sortInfo();
      sort.sname = $scope.sname;
      sortManagerService.addSort(sort, function (data) {
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
      sortManagerService.toUpdate(sort);
    };
  });
