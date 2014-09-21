'use strict';

describe('productService', function () {
  var fromLocal, productService;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      productService = $injector.get('productService');
      fromLocal = $injector.get('fromLocal');
    });

  });
  it('should has products', function () {
    var result = productService.product();
    expect(result[0].productName).toEqual('苹果');
    expect(result[3].productName).toEqual('雪碧');
    expect(result.length).toEqual(6);
  });

  it('it should do product save to localstorage', function () {
    spyOn(fromLocal, 'setData');
    spyOn(productService, 'product').and.returnValue([]);
    productService.setToLocal();
    expect(fromLocal.setData).toHaveBeenCalledWith('allProduct', []);
  });

  it('when cart is null,the total count in cart is one', function () {
    // spyOn(fromLocal,'getData');
    spyOn(fromLocal, 'getData').and.returnValue(null);
    productService.getTotalCount();
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(productService.getTotalCount()).toBe(0);
  });

  it('calculate the total count in cart when cart is not null', function () {
    var cartItem = [{productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克', count: 2}];
    spyOn(fromLocal, 'getData').and.returnValue(cartItem);
    productService.getTotalCount();
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(productService.getTotalCount()).toBe(2);
  });

  it('the function of getData is called one ', function () {
    var productItem = {productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克'};
    spyOn(fromLocal, 'getData').and.returnValue(null);
    spyOn(productService,'getTotalCount').and.returnValue(0);
    productService.addToCart(productItem);
    expect(fromLocal.getData.calls.count()).toBe(1);
  });

  it('this item has been in cart ,so the count add one', function () {
    var productItem = {productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克'};
    var cartItem = [{productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克', count: 2}];
    spyOn(fromLocal, 'getData').and.returnValue(cartItem);
    productService.addToCart(productItem);
    expect(cartItem[0].count).toBe(3);
  });
  it('cart should add a new item and the setData should called two times', function () {
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
