'use strict';
angular.module('letusgo').service('productManagerService', function (fromLocal, $location,$http) {

  this.product = function (callback) {
    $http.get('/api/items').success(function(data){
      callback(data);
    });
  };

  this.delete = function(barcode){
    $http.delete('/api/items/'+barcode);
  };

  this.toAdd = function () {
    $location.path('/addProduct');
  };

  this.productInfo = function () {
    return {
      barcode:'',
      productSort: {
        sid: '',
        sname:''
      },
      productName: '',
      productPrice: '',
      productUnit: ''
    };
  };

  this.toUpdate = function (barcode) {
    $location.path('/updateProduct/' + barcode);
  };

  this.getProductById = function (barcode,callback) {
    this.product(function(data){
      var items = data;
      var item =  _.find(items, { 'barcode': barcode });
      callback(item);
    });

  };

  this.doUpdate = function (product,callback) {
    $http.put('/api/items/' + product.barcode, {item: product})
      .success(function (data) {
        callback(data);
      });
  };

  this.addProduct = function (product) {
    this.product(function(data){
      var items = data;
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
    });

  };
});

