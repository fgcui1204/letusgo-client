'use strict';

describe('cartCtrl',function() {
  var $scope, fromLocal, productService, createController, cartService, cartProduct,orderService;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      fromLocal = $injector.get('fromLocal');
      productService = $injector.get('productService');
      cartService = $injector.get('cartService');
      orderService = $injector.get('orderService');

      var $controller = $injector.get('$controller');

      cartProduct = [
        {productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克', count: 1},
        {productSort: '水果', productName: '香蕉', productPrice: '5', productUnit: '千克', count: 2}
      ];

      createController = function () {
        return $controller('OrderCtrl', {
          $scope: $scope,
          fromLocal: fromLocal,
          productService: productService,
          cartService: cartService,
          orderService:orderService
        });
      };
    });
  });
  it('test the orderItems',function(){
    spyOn(fromLocal,'getData').and.returnValue(cartProduct);
    createController();
    expect($scope.orderItems.length).toEqual(2);
  });
  it('test the totalMoney',function(){
    spyOn(fromLocal,'getData').and.returnValue(cartProduct);
    spyOn(cartService,'getTotalMoney').and.returnValue(10);
    createController();
    expect($scope.totalMoney).toEqual(10);
  });
  it('test the remove()',function(){
    spyOn(fromLocal,'getData').and.returnValue(cartProduct);
    spyOn(cartService,'getTotalMoney').and.returnValue(10);
    spyOn(orderService,'remove');
    createController();
    $scope.remove();
    expect(orderService.remove.calls.count()).toBe(1);
    expect($scope.totalMoney).toEqual(10);
  });
});
