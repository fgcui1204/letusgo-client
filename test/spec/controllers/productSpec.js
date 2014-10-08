'use strict';

xdescribe('productCtrl',function(){
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
        {barcode: '1', productSort: {sid: '1', sname: '水果'}, productName: '苹果', productPrice: '10', productUnit: '千克'},
        {barcode: '2', productSort: {sid: '1', sname: '水果'}, productName: '香蕉', productPrice: '5', productUnit: '千克'},
        {barcode: '3', productSort: {sid: '2', sname: '饮料'}, productName: '可乐', productPrice: '5', productUnit: '瓶'}
      ];
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
