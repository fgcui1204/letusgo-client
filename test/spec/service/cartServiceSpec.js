'use strict';

describe("CartService", function () {
  var cartService,fromLocal, productService,cartItem;
  beforeEach(function () {
    module('ngLetusgoApp');

    inject(function ($injector) {
      cartService = $injector.get("cartService");
      productService = $injector.get("productService");
      fromLocal = $injector.get('fromLocal');
    });
    cartItem = [
      {p_sort:'水果',p_name:'苹果',p_price:'10',p_unit:'千克',count: 3},
      {p_sort:'饮料',p_name:'雪碧',p_price:'3',p_unit:'瓶', count: 3}
    ];


  });
  it('total money should be 0',function(){
    spyOn(fromLocal,'getData').and.returnValue(null);
    var totalMoney = cartService.getTotalMoney();
    expect(fromLocal.getData.calls.length).toBe(1);
    expect(totalMoney).toEqual(0);
  });

  it('total money should be 29',function(){
    spyOn(fromLocal,'getData').and.returnValue(cartItem);
    var totalMoney = cartService.getTotalMoney();
    expect(fromLocal.getData.calls.length).toBe(1);
    expect(totalMoney).toEqual(39);
  });

  it('when change the count in cart the setData should be called',function(){
    var item = {p_sort: '水果', p_name: '苹果', p_price: '10', p_unit: '千克',count: 4};
    spyOn(fromLocal,'getData').andReturn(cartItem);
    spyOn(fromLocal,'setData');
    cartService.changeCount(item);
    expect(fromLocal.setData.calls.length).toBe(2);
    expect(fromLocal.getData.calls.length).toBe(2);
    expect(cartItem[0].count).toEqual(4);
  });

  it('when the count is 0,cartProduct should delete this product',function(){
    var item = {p_sort: '水果', p_name: '苹果', p_price: '10', p_unit: '千克',count: 0};
    spyOn(fromLocal,'getData').and.returnValue(cartItem);
    spyOn(fromLocal,'setData');
    cartService.changeCount(item);
    expect(cartService.cartItemCountNotZero.length).toEqual(1);
    expect(fromLocal.setData.calls.length).toBe(2);
    expect(fromLocal.getData.calls.length).toBe(2);
  });
});
