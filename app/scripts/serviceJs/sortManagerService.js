'use strict';
angular.module('letusgo').service('sortManagerService', function (fromLocal, $location,$http) {

  this.getAllSorts = function (callback) {
    $http.get('/api/categories').success(function(data){
      callback(data);
    });
  };

  this.delete = function (sort) {
    var allSorts = fromLocal.getData('allSort');
    var afterDeleteSorts = _.filter(allSorts, function (sorts) {
      return sorts.sid !== sort.sid;
    });
    fromLocal.setData('allSort', afterDeleteSorts);
    return afterDeleteSorts;
  };

  this.toUpdate = function (sort) {
    $location.path('/updateSort/' + sort.sid);
    return sort.sid;
  };

  this.getSortById = function (id,callback) {
    this.getAllSorts(function(data){
      var allSorts = data;
      var result = _.find(allSorts, { 'sid': id });
      callback(result);
    });

  };

  this.doUpdate = function (sort) {
    var allSorts = fromLocal.getData('allSort');
    _.forEach(allSorts, function (sorts) {
      if (sorts.sid === sort.sid) {
        sorts.sname = sort.sname;
      }
    });
    fromLocal.setData('allSort', allSorts);
    return allSorts;
  };

  this.sortInfo = function () {
    return {
      sid:'',
      sname: ''
    };
  };

  this.addSort = function (sort,callback) {
    $http.post('/api/categories', {sort: sort})
      .success(function (data) {
        callback(data);
      });
  };

});
