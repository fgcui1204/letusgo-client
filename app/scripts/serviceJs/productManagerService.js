'use strict';
angular.module('letusgo').service('productManagerService', function (fromLocal, $location) {
  this.delete = function (barcode) {
    var items = fromLocal.getData('allProduct');
    var afterDeleteItems = _.filter(items, function (item) {
      return item.barcode !== barcode;
    });
    fromLocal.setData('allProduct', afterDeleteItems);
  };

  this.toAdd = function () {
    $location.path('/addProduct');
  };

  this.getAllSort = function () {

    var allSort = fromLocal.getData('allSort');
    var sorts = [];
    _.forEach(allSort, function (sort) {
      sorts.push(sort.sname);
    });
    return sorts;
  };

  this.productInfo = function () {
    return {
      barcode:'',
      productSort: '',
      productName: '',
      productPrice: '',
      productUnit: ''
    };
  };

  this.toUpdate = function (product) {
    $location.path('/updateProduct/' + product.barcode);
  };

  this.getProductById = function (barcode) {
    var items = fromLocal.getData('allProduct');
    return _.find(items, { 'barcode': barcode });
  };

  this.doUpdate = function (product) {
    var allProducts = fromLocal.getData('allProduct');
    _.forEach(allProducts, function (products) {
      if (products.barcode === product.barcode) {
        products.productName = product.productName;
        products.productSort = product.productSort;
        products.productPrice = product.productPrice;
        products.productUnit = product.productUnit;
      }
    });
    fromLocal.setData('allProduct', allProducts);
  };

  this.addProduct = function (product) {
    var items = fromLocal.getData('allProduct');
    var isTheRepeat = [];
    _.forEach(items, function (item) {
      if (item.productName === product.productName) {
        isTheRepeat = item.productName;
      }
    });
    if (isTheRepeat.toString() === '') {
      product.barcode = parseInt(items[items.length-1].barcode)+1;
      items.push(product);
      fromLocal.setData('allProduct', items);
    } else {
      alert(isTheRepeat + '已存在，不能重复添加');
    }
  };
});

