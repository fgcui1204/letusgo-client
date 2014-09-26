'use strict';
angular.module('letusgo')
  .controller('sortManagerCtrl', function ($scope, fromLocal, $location, sortManagerService) {
    sortManagerService.getAllSorts(function(data){
      $scope.sorts = data;
    });

    $scope.addSort = function(){
      var sort = sortManagerService.sortInfo();
      sort.sname = $scope.sname;
      sortManagerService.addSort(sort,function(data){
        $location.path('/sortManager');
      });
    };


    $scope.delete = function (sid) {
      sortManagerService.delete(sid);
      sortManagerService.getAllSorts(function(data){
        $scope.sorts = data;
      });
    };
    $scope.toUpdate = function (sort) {
      sortManagerService.toUpdate(sort);
    };
  });
