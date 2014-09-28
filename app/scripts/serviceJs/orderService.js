'use strict';
angular.module('letusgo').service('orderService', function (fromLocal,$http) {
    this.remove = function(callback){
      $http.delete('/api/payment').success(function(data){
        callback(data);
      });
    };
});
