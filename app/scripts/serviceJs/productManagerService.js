'use strict';
angular.module('letusgo').service('productManagerService', function (fromLocal, $location,$http) {

  this.product = function (callback) {
    $http.get('/api/items').success(function(data){
      console.log(typeof data);
      callback(data);
    });
  };

  this.delete = function(barcode){
    $http.delete('/api/items/'+barcode);
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

  this.getProductById = function (barcode,callback) {
    this.product(function(data){
      var items = data;
      var item =  _.find(items, { 'barcode': barcode });
      callback(item);
    });

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

