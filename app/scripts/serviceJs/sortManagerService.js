'use strict';
angular.module('letusgo').service('sortManagerService', function ($location, $http) {

  this.getAllSorts = function (callback) {
    $http.get('/api/categories').success(function (data) {
      callback(data);
    });
  };

  this.delete = function (sid) {
    $http.delete('/api/categories/' + sid);
  };

  this.toUpdate = function (sort) {
    $location.path('/updateSort/' + sort.sid);
    return sort.sid;
  };

  this.getSortById = function (id, callback) {
    this.getAllSorts(function (data) {
      var allSorts = data;
      var result = _.find(allSorts, { 'sid': id });
      callback(result);
    });

  };

  this.doUpdate = function (sort, callback) {
    $http.put('/api/categories/' + sort.sid, {sort: sort})
      .success(function (data) {
        callback(data);
      });
  };

  this.sortInfo = function () {
    return {
      sid: '',
      sname: ''
    };
  };

  this.addSort = function (sort, callback) {
    $http.post('/api/categories', {sort: sort})
      .success(function (data) {
        callback(data);
      });
  };

});
