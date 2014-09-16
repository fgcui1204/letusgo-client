'use strict';

angular.module('ngLetusgoApp')
  .controller('MainCtrl', function ($scope, $location, productService) {

    productService.setSortToLocal();
    productService.setToLocal();

    $scope.totalCount = productService.getTotalCount();
  });
