'use strict';

describe('productService', function () {
  var $http, productService,products,cartItems,categories,$httpBackend;

  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      productService = $injector.get('productService');
      $http = $injector.get('$http');
    });

    products = [
      {barcode: '1', category: {id: '1', name: '水果'}, name: '苹果', price: '10', unit: '千克'},
      {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'},
      {barcode: '5', category: {id: '3', name: '服装'}, name: 'NIKE鞋', price: '300', unit: '双'}
    ];

    cartItems = [
      {barcode: '1', category: {id: '1', name: '水果'}, name: '苹果', price: '10', unit: '千克', count: 3}
    ];

      categories = [
        {id: '1', name: '水果'},
        {id: '2', name: '饮料'},
        {id: '3', name: '服装'}
      ];
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should load  products', function () {
    $httpBackend.expectGET('/api/items').respond(200, products);
    productService.product(function (data) {
      expect(data.length).toBe(3);
    });
    $httpBackend.flush();
  });

  xit('it should test cartItems', function () {
    productService.cartItem(function(callback){

      callback(items);
      expect(items[0].productName).toEqual('苹果');
      expect(items[3].productName).toEqual('可乐');
      expect(items.length).toEqual(3);
    });
  });

  xit('it should test sorts', function () {
    productService.sort(function(callback){
      callback(sorts);
      expect(sorts[0].sname).toEqual('水果');
      expect(sorts.length).toEqual(4);
    });
  });

  xit('it should test sorts', function () {
    productService.sort(function(callback){
      callback(sorts);
      expect(sorts[0].sname).toEqual('水果');
      expect(sorts.length).toEqual(4);
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
