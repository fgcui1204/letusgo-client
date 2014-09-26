'use strict';
angular.module('letusgo').service('productService', function ($http) {
  this.product = function (callback) {
    $http.get('/api/items').success(function (data) {
      callback(data);
    });
  };

  this.cartItem = function (callback) {
    $http.get('/api/cartItems').success(function (data) {
      var cartItems = data || [];
      callback(cartItems);
    });
  };

  this.sort = function (callback) {
    $http.get('/api/categories').success(function (data) {
      callback(data);
    });
  };

  this.getTotalCount = function (callback) {
    this.cartItem(function (data) {
      var items = data;
      var totalCount = 0;
      if (items === []) {
        totalCount = 0;
      } else {
        _.forEach(items, function (item) {
          totalCount += item.count;
        });
      }
      callback(totalCount);
    });

  };

  this.addToCart = function (productItem, callback) {
    this.cartItem(function (data) {
      var cartData = data;
      var cartItem = _.find(cartData, {'barcode': productItem.barcode});
      if (cartItem !== undefined) {
        cartItem.count++;
      } else {
        productItem.count = 1;
        cartData.push(productItem);
      }
      $http.post('/api/cartItems', {cartItems: cartData}).success(function () {
        callback();
      });
    });


  };
});
