'use strict';
angular.module('letusgo').service('cartService', function (fromLocal, productService) {


  this.getTotalMoney = function (cartItem) {
      var totalMoney = 0;
      if (cartItem !== null) {
        _.forEach(cartItem, function (item) {
          totalMoney += item.productPrice * item.count;
        });
      }
      return totalMoney;


  };

  this.changeCount = function (item) {
    var cartItem = fromLocal.getData('cartProduct');
    _.forEach(cartItem, function (cartItem) {
      if (cartItem.productName === item.productName) {
        cartItem.count = item.count;
      }
    });
    var cartItemCountNotZero = _.filter(cartItem, function (item) {
      return item.count !== 0;
    });
    fromLocal.setData('cartProduct', cartItemCountNotZero);
    fromLocal.setData('totalCount', productService.getTotalCount());
  };

});
