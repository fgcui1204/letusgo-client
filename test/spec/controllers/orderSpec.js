'use strict';

describe("cartCtrl",function() {
  var $scope, fromLocal, productService, createController, cartService, cartProduct,orderService;
  beforeEach(function () {
    module('ngLetusgoApp');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      fromLocal = $injector.get('fromLocal');
      productService = $injector.get('productService');
      cartService = $injector.get('cartService');
      orderService = $injector.get('orderService');

      var $controller = $injector.get('$controller');

      cartProduct = [
        {p_sort: '水果', p_name: '苹果', p_price: '10', p_unit: '千克', count: 1},
        {p_sort: '水果', p_name: '香蕉', p_price: '5', p_unit: '千克', count: 2}
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
    spyOn(fromLocal,'getData').andReturn(cartProduct);
    createController();
    expect($scope.orderItems.length).toEqual(2);
  });
  it('test the totalMoney',function(){
    spyOn(fromLocal,'getData').andReturn(cartProduct);
    spyOn(cartService,'getTotalMoney').andReturn(10);
    createController();
    expect($scope.totalMoney).toEqual(10);
  });
  it('test the remove()',function(){
    spyOn(fromLocal,'getData').andReturn(cartProduct);
    spyOn(cartService,'getTotalMoney').andReturn(10);
    spyOn(orderService,'remove');
    createController();
    $scope.remove();
    expect(orderService.remove.calls.length).toBe(1);
    expect($scope.totalMoney).toEqual(10);
  });
});
