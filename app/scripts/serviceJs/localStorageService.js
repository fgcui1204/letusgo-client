angular.module('ngLetusgoApp').service('fromLocal', function () {
  this.getData = function (local) {
    return JSON.parse(localStorage.getItem(local));
  };

  this.setData = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
});
