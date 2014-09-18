'use strict';

describe("productManagerServiceSpec", function () {
  var fromLocal, productManagerService,products;
  beforeEach(function () {
    module('ngLetusgoApp');

    inject(function ($injector) {
      productManagerService = $injector.get("productManagerService");
      fromLocal = $injector.get('fromLocal');
    });
    products = [
      {p_sort: '水果', p_name: '苹果', p_price: '10', p_unit: '千克'},
      {p_sort: '水果', p_name: '香蕉', p_price: '10', p_unit: '千克'}
    ];

  });

  it('the getData should be called one and delete product', function () {
    var pname = "苹果";
    spyOn(fromLocal, 'getData').andReturn(products);
    productManagerService.delete(pname);
    expect(fromLocal.getData.calls.length).toBe(1);
  });

  it('the length of allsort is 2', function () {
    var allsort = [{sid: '1', sname: '水果'},{sid: '2', sname: '饮料'}];
    spyOn(fromLocal, 'getData').andReturn(allsort);
    productManagerService.getAllSort();
    expect(fromLocal.getData.calls.length).toBe(1);
    expect(allsort.length).toEqual(2);
    expect(allsort[0].sname).toEqual("水果");
  });
  it('get product by name', function () {
    spyOn(fromLocal, 'getData').andReturn(products);
    var item =  productManagerService.getProductByName("苹果");
    expect(fromLocal.getData.calls.length).toBe(1);
    expect(item[0].p_name).toEqual("苹果");
    expect(item[0].p_sort).toEqual("水果");
  });
  it('update the product', function () {
    spyOn(fromLocal, 'getData').andReturn(products);
    var product = [{p_sort: '水果', p_name: '苹果', p_price: '20', p_unit: '千克'}];
    productManagerService.doUpdate(product[0]);
    spyOn(fromLocal, 'setData');
    expect(fromLocal.getData.calls.length).toBe(1);
    expect(products[0].p_price).toEqual('20');
    expect(products[1].p_price).toEqual('10');
  });

  it('add repeat product', function () {
    spyOn(fromLocal, 'getData').andReturn(products);
    var product = {p_sort: '水果', p_name: '苹果', p_price: '20', p_unit: '千克'};
    productManagerService.addProduct(product);
    expect(fromLocal.getData.calls.length).toBe(1);
    expect(products.length).toBe(2);
  });
  it('add product', function () {
    spyOn(fromLocal, 'getData').andReturn(products);
    var product = {p_sort: '水果', p_name: '梨', p_price: '20', p_unit: '千克'};
    productManagerService.addProduct(product);
    expect(fromLocal.getData.calls.length).toBe(1);
    expect(products.length).toBe(3);
  });
});
