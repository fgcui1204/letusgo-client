angular.module('ngLetusgoApp')
  .controller('updateSort', function ($scope,fromLocal,sortManagerService,$routeParams,$location) {
    $scope.sort = sortManagerService.getSortById($routeParams.sid)[0];

    $scope.doUpdate = function(){
      sortManagerService.doUpdate($scope.sort);
      $location.path('/sortManager');
    }
  });
