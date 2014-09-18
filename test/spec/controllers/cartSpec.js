'use strict';

describe("cartCtrl",function() {
  var $scope, fromLocal, productService, createController,cartService,cartProduct;
  beforeEach(function () {
    module('ngLetusgoApp');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      fromLocal = $injector.get('fromLocal');
      productService = $injector.get('productService');
      cartService = $injector.get('cartService');

      var $controller = $injector.get('$controller');

      cartProduct = [{p_sort:'水果',p_name:'苹果',p_price:'10',p_unit:'千克',count:1},
        {p_sort:'水果',p_name:'香蕉',p_price:'5',p_unit:'千克',count:2}];

      createController = function () {
        return $controller('CartCtrl', {
          $scope: $scope,
          fromLocal: fromLocal,
          productService: productService,
          cartService:cartService
        });
      };

    });
  });
  it('the function of getData should be excuted ',function(){
    spyOn(fromLocal,'getData').andReturn(cartProduct);
    spyOn(productService,'getTotalCount');
    spyOn(cartService,'getTotalMoney');
    createController();
    expect(fromLocal.getData.calls.length).toBe(1);
    expect($scope.cartItems.length).toBe(2);
  });
  it('totalMoney should be 20 ',function(){
    spyOn(fromLocal,'getData').andReturn(cartProduct);
    spyOn(productService,'getTotalCount');
    spyOn(cartService,'getTotalMoney').andReturn(20);
    createController();
    expect(cartService.getTotalMoney.calls.length).toBe(1);
    expect($scope.totalMoney).toBe(20);
  });
  it('the function changeCount() ',function(){
    var item = [{p_sort:'水果',p_name:'苹果',p_price:'10',p_unit:'千克',count:2}];
    spyOn(fromLocal,'getData').andReturn(cartProduct);
    spyOn(productService,'getTotalCount');
    spyOn(cartService,'getTotalMoney').andReturn(20);
    spyOn(cartService,'changeCount');
    createController();
    $scope.changeCount(item);
    expect(cartService.changeCount.calls.length).toBe(1);
    //expect($scope.totalMoney).toBe(20);
  });


});
