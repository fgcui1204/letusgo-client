angular.module('letusgo').service('sortManagerService', function (fromLocal, $location) {

  this.getAllSorts = function () {
    return fromLocal.getData('allSort');
  };

  this.delete = function (sort) {
    var allSorts = fromLocal.getData('allSort');
    var afterDeleteSorts = _.filter(allSorts, function (sorts) {
      return sorts.sname != sort.sname;
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
      if (sorts.sid == sort.sid) {
        sorts.sname = sort.sname;
      }
    });
    fromLocal.setData('allSort', allSorts);
    return allSorts;
  }

});
