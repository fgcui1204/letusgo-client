'use strict';

describe('addProductCtrl', function () {
  var $scope, productManagerService,$controller, $location, createController,products,CategoryManagerService,categories;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      productManagerService = $injector.get('productManagerService');
      CategoryManagerService = $injector.get('CategoryManagerService');
      $location = $injector.get('$location');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('addProductCtrl', {
          $scope: $scope,
          $location: $location,
          productManagerService: productManagerService,
          CategoryManagerService:CategoryManagerService
        });
      };
    });

    products = [
      {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'},
      {barcode: '5', category: {id: '3', name: '服装'}, name: 'NIKE鞋', price: '300', unit: '双'}
    ];

    categories = [
      {id: '2', name: '饮料'},
      {id: '3', name: '服装'}
    ];

    spyOn(CategoryManagerService, 'getCategories').and.callFake(function (callback) {
      callback(categories);
    });
  });

  it ('it should load all sorts', function () {
    createController();
    CategoryManagerService .getCategories(function(data){
      $scope.categories = data;
      expect($scope.categories.length).toEqual(2);
    });
  });

  it ('productInfo should be a object', function () {
    var productInfo = {
      barcode: '',
      category: {
        id: '',
        name: ''
      },
      name: '',
      price: '',
      unit: ''
    };

    spyOn(productManagerService,'productInfo').and.returnValue(productInfo);
    createController();
    expect($scope.productInfo).toEqual(productInfo);
  });

 xit ('it should add product', function () {
    var productInfo = {
      productSort: '水果',
      productName: '梨',
      productPrice: '5',
      productUnit: '千克'
    };
    spyOn(productManagerService,'productInfo').and.returnValue(productInfo);
    spyOn(productManagerService,'addProduct');
    createController();
    $scope.addProduct();
    expect(productManagerService.addProduct).toHaveBeenCalledWith(productInfo);
    expect($scope.productInfo).toEqual(productInfo);
  });

  xit('should come into productManager after add product', function () {
    spyOn(productManagerService,'getAllSort').and.returnValue(allSort);
    createController();
    $scope.addProduct();
    expect($location.path() === '/productManager').toBe(true);
  });
});
