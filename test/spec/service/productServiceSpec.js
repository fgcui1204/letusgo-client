'use strict';

describe('productService', function () {
  var $http, productService,items,cartItems;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      productService = $injector.get('productService');
      $http = $injector.get('$http');
    });

    items = [
      {barcode: '1', productSort: {sid: '1', sname: '水果'}, productName: '苹果', productPrice: '10', productUnit: '千克'},
      {barcode: '2', productSort: {sid: '1', sname: '水果'}, productName: '香蕉', productPrice: '5', productUnit: '千克'},
      {barcode: '3', productSort: {sid: '2', sname: '饮料'}, productName: '可乐', productPrice: '5', productUnit: '瓶'}
    ];
    
    cartItems = [
      {barcode: '1', productSort: {sid: '1', sname: '水果'}, productName: '苹果', productPrice: '10', productUnit: '千克',count:3}
    ];
  });
  it('should has products', function () {
    productService.product(function(callback){
       callback(cartItems);
      expect(cartItems[0].productName).toEqual('苹果');
      expect(cartItems[0].count).toEqual(3);
      expect(cartItems.length).toEqual(1);
  });
  });

  it('it should test cartItems', function () {
    productService.cartItem(function(callback){

      callback(items);
      expect(items[0].productName).toEqual('苹果');
      expect(items[3].productName).toEqual('可乐');
      expect(items.length).toEqual(3);
    });
  });
  xit('when cart is null,the total count in cart is one', function () {
    // spyOn(fromLocal,'getData');
    spyOn(fromLocal, 'getData').and.returnValue(null);
    productService.getTotalCount();
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(productService.getTotalCount()).toBe(0);
  });

  xit('calculate the total count in cart when cart is not null', function () {
    var cartItem = [{productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克', count: 2}];
    spyOn(fromLocal, 'getData').and.returnValue(cartItem);
    productService.getTotalCount();
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(productService.getTotalCount()).toBe(2);
  });

  xit('the function of getData is called one ', function () {
    var productItem = {productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克'};
    spyOn(fromLocal, 'getData').and.returnValue(null);
    spyOn(productService,'getTotalCount').and.returnValue(0);
    productService.addToCart(productItem);
    expect(fromLocal.getData.calls.count()).toBe(1);
  });

  xit('this item has been in cart ,so the count add one', function () {
    var productItem = {productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克'};
    var cartItem = [{productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克', count: 2}];
    spyOn(fromLocal, 'getData').and.returnValue(cartItem);
    productService.addToCart(productItem);
    expect(cartItem[0].count).toBe(3);
  });
  xit('cart should add a new item and the setData should called two times', function () {
    var productItem = {productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克'};
    var cartItem = [{productSort: '水果', productName: '香蕉', productPrice: '5', productUnit: '千克', count: '2'}];
    spyOn(fromLocal, 'getData').and.returnValue(cartItem);
    spyOn(fromLocal,'setData');
    productService.addToCart(productItem);
    expect(fromLocal.setData.calls.count()).toBe(2);
    expect(cartItem.length).toEqual(2);
    expect(cartItem[1].count).toBe(1);
  });
});
