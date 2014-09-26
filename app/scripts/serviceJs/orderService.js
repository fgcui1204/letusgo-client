'use strict';
angular.module('letusgo').service('orderService', function ($location,fromLocal,$http) {
    this.remove = function(callback){
      $http.del('/api/payment').success(function(data){
        console.log(data);
        callback(data);
      });
//        localStorage.removeItem('cartProduct');
//        fromLocal.setData('totalCount',0);
//        $location.path('/homePage').replace();
    };
});
