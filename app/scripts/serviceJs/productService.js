'use strict';
angular.module('letusgo').service('productService', function (fromLocal) {
  this.product = function () {
    return [
      {barcode:'1', productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克'},
      {barcode:'2', productSort: '水果', productName: '香蕉', productPrice: '5', productUnit: '千克'},
      {barcode:'3', productSort: '饮料', productName: '可乐', productPrice: '5', productUnit: '瓶'},
      {barcode:'4', productSort: '饮料', productName: '雪碧', productPrice: '3', productUnit: '瓶'},
      {barcode:'5', productSort: '服装', productName: 'NIKE鞋', productPrice: '300', productUnit: '双'},
      {barcode:'6', productSort: '服装', productName: '阿迪T恤', productPrice: '200', productUnit: '件'}
    ];
  };

  this.sort = function () {
    return [
      {sid: '1', sname: '水果'},
      {sid: '2', sname: '饮料'},
      {sid: '3', sname: '服装'},
      {sid: '4', sname: '蔬菜'}
    ];
  };

  this.setSortToLocal = function () {
    fromLocal.setData('allSort', this.sort());
  };

  this.setToLocal = function () {
    fromLocal.setData('allProduct', this.product());
  };

  this.getTotalCount = function () {
    var items = fromLocal.getData('cartProduct');
    var totalCount = 0;
    if (items === null) {
      totalCount = 0;
    } else {
      _.forEach(items, function (item) {
        totalCount += item.count;
      });
    }
    return totalCount;
  };

  this.productWithSort = function () {
    var items = fromLocal.getData('allProduct');
    var sorts = fromLocal.getData('allSort');
    _.forEach(items, function (item) {
      _.forEach(sorts, function (sort) {
        if (item.productSort === sort.sid) {
          item.productSort = sort.sname;
        }
      });
    });
    return items;
  };

  this.addToCart = function (productItem) {
    var cartData = fromLocal.getData('cartProduct');

    if (cartData === null) {
      cartData = [];
    }
    var cartItem = _.find(cartData, {'barcode': productItem.barcode});
    if (cartItem !== undefined) {
      cartItem.count++;
    } else {

      productItem.count = 1;
      cartData.push(productItem);
    }
    fromLocal.setData('cartProduct', cartData);
    fromLocal.setData('totalCount', this.getTotalCount());
  };
});
