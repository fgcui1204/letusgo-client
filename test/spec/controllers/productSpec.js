'use strict';

describe('productCtrl',function(){
    var $scope,productService,createController,products,$controller;
    beforeEach(function () {

        module('letusgo');
        inject(function ($injector){
            $scope = $injector.get('$rootScope').$new();
            productService = $injector.get('productService');
            $controller = $injector.get('$controller');

        });

            createController = function () {
            return $controller('ProCtrl', {
              $scope: $scope,
              productService: productService
            });
          };

      products = [
        {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'},
        {barcode: '5', category: {id: '3', name: '服装'}, name: 'NIKE鞋', price: '300', unit: '双'}
      ];

      spyOn(productService,'product').and.callFake(function(callback){
        callback(products);
      });
    });

    it ('should get all products', function () {
      createController();

      productService.product(function(data){
        $scope.products = data;
        expect($scope.products.length).toBe(2);
      });
    });
});
