'use strict';

describe("ProductManagerCtrl",function() {
  var $scope, fromLocal, productManagerService,$location, createController,allProduct;
  beforeEach(function () {
    module('ngLetusgoApp');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      fromLocal = $injector.get('fromLocal');
      productManagerService = $injector.get('productManagerService');
      $location = $injector.get('$location');
      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ProductManagerCtrl', {
          $scope: $scope,
          fromLocal: fromLocal,
          $location:$location,
          productManagerService: productManagerService
        });
      };

    });
    allProduct = [
      {p_sort:'水果',p_name:'苹果',p_price:'10',p_unit:'千克'},
      {p_sort:'水果',p_name:'香蕉',p_price:'5',p_unit:'千克'}
    ];
  });

  it ('it should load all product', function () {
    spyOn(fromLocal,'getData').andReturn(allProduct);
    createController();
    expect($scope.products).toEqual(allProduct);
  });

  it ('it should delete the product', function () {
    spyOn(productManagerService,'delete').andReturn(allProduct);
    spyOn(fromLocal,'getData').andReturn(allProduct);
    createController();
    var pname = '苹果';
    $scope.delete(pname);
    expect(productManagerService.delete).toHaveBeenCalledWith(pname);
  });

  it('should come into addProduct when click the add product', function () {
    createController();
    $scope.toAdd();
    expect($location.path() === '/addProduct').toBe(true);
  });

  it('should come into update when click the update button', function () {
    var product = {p_sort:'水果',p_name:'香蕉',p_price:'5',p_unit:'千克'};
    createController();
    $scope.toUpdate(product);
    expect($location.path() === '/updateProduct/香蕉').toBe(true);
  });
});
