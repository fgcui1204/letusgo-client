angular.module('ngLetusgoApp').service('cartService', function (fromLocal, productService) {
  var cartItem = fromLocal.getData('cartProduct');
  this.cart_Item_count_not_0 = [];

  this.getTotalMoney = function () {
    var totalMoney = 0;
    if (cartItem !== null) {
      _.forEach(cartItem, function (item) {
        totalMoney += item.p_price * item.count;
      });
    }
    return totalMoney;
  };

  this.changeCount = function (item) {
    _.forEach(cartItem, function (cart_item) {
      if (cart_item.p_name == item.p_name) {
        cart_item.count = item.count;
      }
    });
    this.cart_Item_count_not_0 = _.filter(cartItem, function (item) {
      return item.count != 0;
    });
    fromLocal.setData('cartProduct', this.cart_Item_count_not_0);
    fromLocal.setData('totalCount', productService.getTotalCount());
  };

});
