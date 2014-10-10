'use strict';

describe('cartCtrl',function() {
  var $scope,$controller, productService, createController,cartService,cartItems;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');
      cartService = $injector.get('cartService');

      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CartCtrl', {
          $scope: $scope,
          productService: productService,
          cartService:cartService
        });
      };
    });

  cartItems = [
    {barcode: '2', category: {id: '1', name: '水果'}, name: '香蕉', price: '5', unit: '千克',count:'3'},
    {barcode: '3', category: {id: '2', name: '饮料'}, name: '可乐', price: '5', unit: '瓶',count:'2'}
  ];

  spyOn(productService,'cartItem').and.callFake(function(callback){
    callback(cartItems);
  });
  });

  it('load all cartItems ',function(){
    createController();
    productService.cartItem(function (data) {
      $scope.cartItems = data;
      expect($scope.cartItems.length).toBe(2);
    });
  });

  xit('totalMoney should be 20 ',function(){
    spyOn(fromLocal,'getData').and.returnValue(cartProduct);
    spyOn(productService,'getTotalCount');
    spyOn(cartService,'getTotalMoney').and.returnValue(20);
    createController();
    expect(cartService.getTotalMoney.calls.count()).toBe(1);
    expect($scope.totalMoney).toBe(20);
  });
  xit('the function changeCount() ',function(){
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
