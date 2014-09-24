'use strict';
angular.module('letusgo').service('productService', function (fromLocal,$http) {
  this.product = function (callback) {
    $http.get('/api/items').success(function(data){
        callback(data);
    });
  };

  this.sort = function (callback) {
//    return [
//      {sid: '1', sname: '水果'},
//      {sid: '2', sname: '饮料'},
//      {sid: '3', sname: '服装'},
//      {sid: '4', sname: '蔬菜'}
//    ];
    $http.get('/api/categories').success(function(data){
      callback(data);
    });
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

//  this.productWithSort = function () {
//    var items = this.product();
//    var sorts = fromLocal.getData('allSort');
//    _.forEach(items, function (item) {
//      _.forEach(sorts, function (sort) {
//        if (item.productSort === sort.sid) {
//          item.productSort = sort.sname;
//        }
//      });
//    });
//    return items;
//  };

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
