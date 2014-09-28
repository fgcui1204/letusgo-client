'use strict';
angular.module('letusgo').service('productManagerService', function ( $location, $http) {

  this.product = function (callback) {
    $http.get('/api/items').success(function (data) {
      callback(data);
    });
  };

  this.delete = function (barcode) {
    $http.delete('/api/items/' + barcode);
  };

  this.toAdd = function () {
    $location.path('/addProduct');
  };

  this.productInfo = function () {
    return {
      barcode: '',
      productSort: {
        sid: '',
        sname: ''
      },
      productName: '',
      productPrice: '',
      productUnit: ''
    };
  };

  this.toUpdate = function (barcode) {
    $location.path('/updateProduct/' + barcode);
  };

  this.getProductById = function (barcode, callback) {
    this.product(function (data) {
      var items = data;
      var item = _.find(items, { 'barcode': barcode });
      callback(item);
    });

  };


  this.judgeIfHaveItems = function(sid,callback){
    this.product(function(data){
      var items = data;
      var result = true;
      _.forEach(items,function(item){
        if(item.productSort.sid === sid){
         result = false;
        }
      });
        callback(result);
    });
  };
  this.doUpdate = function (product, callback) {
    $http.put('/api/items/' + product.barcode, {item: product})
      .success(function (data) {
        callback(data);
      });
  };

  this.addProduct = function (product, callback) {
    $http.post('/api/items', {item: product})
      .success(function (data) {
        callback(data);
      });
  };
});

