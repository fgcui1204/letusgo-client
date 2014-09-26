'use strict';
angular.module('letusgo').service('orderService', function ($location,fromLocal,$http) {
    this.remove = function(callback){
      $http.delete('/api/payment').success(function(data){
        callback(data);
      });
        $location.path('/homePage').replace();
    };
});
