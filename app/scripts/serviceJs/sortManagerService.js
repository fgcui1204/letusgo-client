angular.module('ngLetusgoApp').service('sortManagerService', function (fromLocal, $location) {
  var allSorts = fromLocal.getData('allSort');
  
  this.getAllSorts = function () {
    return fromLocal.getData('allSort');
  };

  this.delete = function (sort) {

    var afterDeleteSorts = _.filter(allSorts, function (sorts) {
      return sorts.sname != sort.sname;
    });
    fromLocal.setData('allSort', afterDeleteSorts);

  };

  this.toUpdate = function (sort) {
    $location.path('/updateSort/' + sort.sid);
  };

  this.getSortById = function (id) {
    return _.filter(allSorts, { 'sid': id });
  };

  this.doUpdate = function (sort) {
    _.forEach(allSorts, function (sorts) {
      if (sorts.sid == sort.sid) {
        sorts.sname = sort.sname;
      }
    });
    fromLocal.setData('allSort', allSorts);
  }

});
