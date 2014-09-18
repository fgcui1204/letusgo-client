'use strict';

describe("CartService", function () {
  var $location,orderService, fromLocal;
  beforeEach(function () {
    module('ngLetusgoApp');

    inject(function ($injector) {
      $location = $injector.get('$location');
      orderService = $injector.get("orderService");
      fromLocal = $injector.get('fromLocal');
    });

  });
  it('the localStorage is null',function(){
    orderService.remove();
    expect(fromLocal.getData("cartProduct")).toEqual(null);
    expect(fromLocal.getData("totalCount")).toBe(0);
  });
});
