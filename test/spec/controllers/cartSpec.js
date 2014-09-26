'use strict';

xdescribe('cartCtrl',function() {
  var $scope, fromLocal, productService, createController,cartService,cartProduct;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      fromLocal = $injector.get('fromLocal');
      productService = $injector.get('productService');
      cartService = $injector.get('cartService');

      var $controller = $injector.get('$controller');

      cartProduct = [{productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克',count:1},
        {productSort:'水果',productName:'香蕉',productPrice:'5',productUnit:'千克',count:2}];

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
    spyOn(fromLocal,'getData').and.returnValue(cartProduct);
    spyOn(productService,'getTotalCount');
    spyOn(cartService,'getTotalMoney');
    createController();
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect($scope.cartItems.length).toBe(2);
  });
  it('totalMoney should be 20 ',function(){
    spyOn(fromLocal,'getData').and.returnValue(cartProduct);
    spyOn(productService,'getTotalCount');
    spyOn(cartService,'getTotalMoney').and.returnValue(20);
    createController();
    expect(cartService.getTotalMoney.calls.count()).toBe(1);
    expect($scope.totalMoney).toBe(20);
  });
  it('the function changeCount() ',function(){
    var item = [{productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克',count:2}];
    spyOn(fromLocal,'getData').and.returnValue(cartProduct);
    spyOn(productService,'getTotalCount');
    spyOn(cartService,'getTotalMoney').and.returnValue(20);
    spyOn(cartService,'changeCount');
    createController();
    $scope.changeCount(item);
    expect(cartService.changeCount.calls.count()).toBe(1);
    //expect($scope.totalMoney).toBe(20);
  });


});
