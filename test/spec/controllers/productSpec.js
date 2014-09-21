'use strict';

describe('productCtrl',function(){
    var $scope,fromLocal,productService,createController;
    beforeEach(function () {
        module('letusgo');
        inject(function ($injector){
            $scope = $injector.get('$rootScope').$new();
            fromLocal = $injector.get('fromLocal');
            productService = $injector.get('productService');
            var $controller = $injector.get('$controller');

            createController = function () {
            return $controller('ProCtrl', {
              $scope: $scope,
              fromLocal: fromLocal,
              productService: productService
            });
          };

        });
    });
    it ('setToLocal should be execute', function () {
      var allProduct = [{productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克'},
        {productSort:'水果',productName:'香蕉',productPrice:'5',productUnit:'千克'}];
        spyOn(productService,'setToLocal');
        spyOn(productService,'addToCart');
        spyOn(fromLocal,'getData').and.returnValue(allProduct);
        createController();
        $scope.addToCart(allProduct[0]);
        expect($scope.products.length).toBe(2);
        expect(productService.addToCart.calls.count()).toBe(1);
    });
});
