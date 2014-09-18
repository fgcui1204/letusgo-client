'use strict';

describe("productCtrl",function(){
    var $scope,fromLocal,productService,createController;
    beforeEach(function () {
        module('ngLetusgoApp');
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
      var allProduct = [{p_sort:'水果',p_name:'苹果',p_price:'10',p_unit:'千克'},
        {p_sort:'水果',p_name:'香蕉',p_price:'5',p_unit:'千克'}];
        spyOn(productService,'setToLocal');
        spyOn(productService,'addToCart');
        spyOn(fromLocal,'getData').andReturn(allProduct);
        createController();
        $scope.addToCart(allProduct[0]);
        expect($scope.products.length).toBe(2);
        expect(productService.addToCart.calls.length).toBe(1);
    });
});
