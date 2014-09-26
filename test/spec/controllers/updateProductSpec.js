'use strict';

xdescribe('updateProduct',function() {
  var $scope, fromLocal, productManagerService, $routeParams, createController, allProduct,allSort;
  beforeEach(function () {
    module('letusgo');
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
      {productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克'},
      {productSort: '水果', productName: '香蕉', productPrice: '5', productUnit: '千克'}
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
    expect($scope.productInfo).toEqual({productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克'});
  });
});
