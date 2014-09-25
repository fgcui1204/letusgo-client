'use strict';
angular.module('letusgo').service('cartService', function (fromLocal, productService,$http) {


  this.getTotalMoney = function (callback) {
    productService.cartItem(function(data){
      var cartItem = data;
      var totalMoney = 0;
      if (cartItem !== null) {
        _.forEach(cartItem, function (item) {
          totalMoney += item.productPrice * item.count;
        });
      }
      callback(totalMoney);
    });

  };

  this.changeCount = function (item) {
    productService.cartItem(function(data){
      var cartItem = data;
      _.forEach(cartItem, function (cartItem) {
        if (cartItem.productName === item.productName) {
          cartItem.count = item.count;
        }
      });
      var cartItemCountNotZero = _.filter(cartItem, function (item) {
        return item.count !== 0;
      });
      $http.post('/api/cartItems',{cartItems:cartItemCountNotZero});
    });

  };

});
