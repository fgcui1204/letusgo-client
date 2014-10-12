'use strict';

describe('cartCtrl',function() {
  var $scope,productService,$location,createController, cartService,cartItems,orderService,$controller;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $location = $injector.get('$location');
      productService = $injector.get('productService');
      cartService = $injector.get('cartService');
      orderService = $injector.get('orderService');
      $controller = $injector.get('$controller');

      cartItems = [
        {barcode: '2', category: {id: '1', name: '水果'}, name: '香蕉', price: '5', unit: '千克',count:'3'},
        {barcode: '3', category: {id: '2', name: '饮料'}, name: '可乐', price: '5', unit: '瓶',count:'2'}
      ];

      createController = function () {
        return $controller('OrderCtrl', {
          $scope: $scope,
          $location: $location,
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
