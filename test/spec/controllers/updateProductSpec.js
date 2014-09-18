'use strict';

describe("updateProduct",function() {
  var $scope, fromLocal, productManagerService, $routeParams, createController, allProduct,allSort;
  beforeEach(function () {
    module('ngLetusgoApp');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      fromLocal = $injector.get('fromLocal');
      productManagerService = $injector.get('productManagerService');
      $routeParams = $injector.get('$routeParams');
      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('updateProduct', {
          $scope: $scope,
          fromLocal: fromLocal,
          $routeParams: $routeParams,
          productManagerService: productManagerService
        });
      };

    });
    allProduct = [
      {p_sort: '水果', p_name: '苹果', p_price: '10', p_unit: '千克'},
      {p_sort: '水果', p_name: '香蕉', p_price: '5', p_unit: '千克'}
    ];
    allSort = ['水果','饮料'];

  });
  it ('it should load all sorts', function () {
    spyOn(productManagerService,'getAllSort').and.returnValue(allSort);
    $routeParams.name = '苹果';
    createController();
    expect($scope.allSorts).toEqual(allSort);
  });

  it ('it should get product by name', function () {
    spyOn(productManagerService,'getAllSort').and.returnValue(allSort);
    $routeParams.name = '苹果';
    createController();
    expect($scope.productInfo).toEqual({p_sort: '水果', p_name: '苹果', p_price: '10', p_unit: '千克'});
  });
});
