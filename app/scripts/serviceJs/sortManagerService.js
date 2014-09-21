'use strict';
angular.module('letusgo').service('sortManagerService', function (fromLocal, $location) {

  this.getAllSorts = function () {
    return fromLocal.getData('allSort');
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

  this.getSortById = function (id) {
    var allSorts = fromLocal.getData('allSort');
    return _.filter(allSorts, { 'sid': id });
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

  this.addSort = function (sort) {
    var sorts = fromLocal.getData('allSort');
    var isTheRepeat = [];
    _.forEach(sorts, function (s) {
      if (s.sname === sort.sname) {
        isTheRepeat = s.sname;
      }
    });
    if (isTheRepeat.toString() === '') {
      sort.sid = parseInt(sorts[sorts.length-1].sid)+1+'';
      sorts.push(sort);
      fromLocal.setData('allSort', sorts);
    } else {
      alert(isTheRepeat + '已存在，不能重复添加');
    }
  };

});
