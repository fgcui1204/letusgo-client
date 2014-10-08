'use strict';

describe('ProductManagerCtrl',function() {
  var $scope, productManagerService,$location, createController,products,$controller;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      productManagerService = $injector.get('productManagerService');
      $location = $injector.get('$location');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ProductManagerCtrl', {
          $scope: $scope,
          $location:$location,
          productManagerService: productManagerService
        });
      };

    });
    products = [
      {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'},
      {barcode: '5', category: {id: '3', name: '服装'}, name: 'NIKE鞋', price: '300', unit: '双'}
    ];

    spyOn(productManagerService, 'product').and.callFake(function (callback) {
      callback(products);
    });
  });

  it ('it should get all products', function () {
    createController();

    productManagerService.product(function(data){
      $scope.products = data;
      expect($scope.products).toEqual(products);
    });
  });

  xit ('it should delete the product', function () {
    spyOn(productManagerService,'delete').and.returnValue(allProduct);
    spyOn(fromLocal,'getData').and.returnValue(allProduct);
    createController();
    var pname = '苹果';
    $scope.delete(pname);
    expect(productManagerService.delete).toHaveBeenCalledWith(pname);
  });

  xit('should come into addProduct when click the add product', function () {
    createController();
    $scope.toAdd();
    expect($location.path() === '/addProduct').toBe(true);
  });

  xit('should come into update when click the update button', function () {
    var product = {productSort:'水果',productName:'香蕉',productPrice:'5',productUnit:'千克'};
    createController();
    $scope.toUpdate(product);
    expect($location.path() === '/updateProduct/香蕉').toBe(true);
  });
});
