angular.module('ngLetusgoApp')
    .controller('OrderCtrl', function ($scope,fromLocal,cartService,productService,orderService) {
        $scope.orderItems = fromLocal.getData("cartProduct");

        $scope.$parent.totalCount=productService.getTotalCount();

        $scope.totalMoney = cartService.getTotalMoney();

        $scope.remove = function(){
            orderService.remove();
            $scope.$parent.totalCount=productService.getTotalCount();

        }
    });

