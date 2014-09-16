angular.module('ngLetusgoApp').service('orderService', function ($location,fromLocal) {
    this.remove = function(){
        localStorage.removeItem('cartProduct');
        fromLocal.setData('totalCount',0);
        $location.path('/homePage').replace();
    }
});
