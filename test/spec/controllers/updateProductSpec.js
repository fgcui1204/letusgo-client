'use strict';

describe('updateProduct',function() {
  var $scope, productManagerService, $routeParams,$controller, createController,CategoryManagerService, products,categories;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      productManagerService = $injector.get('productManagerService');
      CategoryManagerService = $injector.get('CategoryManagerService');
      $routeParams = $injector.get('$routeParams');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('updateProduct', {
          $scope: $scope,
          $routeParams: $routeParams,
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
  });

  it ('it should load all sorts', function () {
    createController();
    CategoryManagerService .getCategories(function(data){
      $scope.categories = data;
      expect($scope.categories.length).toEqual(2);
    });
  });

  it ('it should get product by name', function () {
    spyOn(productManagerService,'getAllSort').and.returnValue(allSort);
    $routeParams.name = '苹果';
    createController();
    expect($scope.productInfo).toEqual({productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克'});
  });
});
