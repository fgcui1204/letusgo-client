'use strict';

xdescribe('addProductCtrl', function () {
  var $scope, fromLocal, productManagerService, $location, createController, allSort,allProduct;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      fromLocal = $injector.get('fromLocal');
      productManagerService = $injector.get('productManagerService');
      $location = $injector.get('$location');
      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('addProductCtrl', {
          $scope: $scope,
          fromLocal: fromLocal,
          $location: $location,
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
    createController();
    expect($scope.allSorts).toEqual(allSort);
  });

  it ('productInfo should be a object', function () {
    spyOn(productManagerService,'getAllSort').and.returnValue(allSort);
    var productInfo = {
      productSort: '',
      productName: '',
      productPrice: '',
      productUnit: ''};
    spyOn(productManagerService,'productInfo').and.returnValue(productInfo);
    createController();
    expect($scope.productInfo).toEqual(productInfo);
  });

  it ('it should add product', function () {
    spyOn(productManagerService,'getAllSort').and.returnValue(allSort);
    var productInfo = {
      productSort: '水果',
      productName: '梨',
      productPrice: '5',
      productUnit: '千克'};
    spyOn(productManagerService,'productInfo').and.returnValue(productInfo);
    spyOn(productManagerService,'addProduct');
    createController();
    $scope.addProduct();
    expect(productManagerService.addProduct).toHaveBeenCalledWith(productInfo);
    expect($scope.productInfo).toEqual(productInfo);
  });

  it('should come into productManager after add product', function () {
    spyOn(productManagerService,'getAllSort').and.returnValue(allSort);
    createController();
    $scope.addProduct();
    expect($location.path() === '/productManager').toBe(true);
  });
});
