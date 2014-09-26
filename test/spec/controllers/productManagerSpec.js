'use strict';

xdescribe('ProductManagerCtrl',function() {
  var $scope, fromLocal, productManagerService,$location, createController,allProduct;
  beforeEach(function () {
    module('letusgo');
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
      {productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克'},
      {productSort:'水果',productName:'香蕉',productPrice:'5',productUnit:'千克'}
    ];
  });

  it ('it should load all product', function () {
    spyOn(fromLocal,'getData').and.returnValue(allProduct);
    createController();
    expect($scope.products).toEqual(allProduct);
  });

  it ('it should delete the product', function () {
    spyOn(productManagerService,'delete').and.returnValue(allProduct);
    spyOn(fromLocal,'getData').and.returnValue(allProduct);
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
    var product = {productSort:'水果',productName:'香蕉',productPrice:'5',productUnit:'千克'};
    createController();
    $scope.toUpdate(product);
    expect($location.path() === '/updateProduct/香蕉').toBe(true);
  });
});
