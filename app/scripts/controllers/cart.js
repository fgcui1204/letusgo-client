angular.module('ngLetusgoApp')
    .controller('CartCtrl', function ($scope,fromLocal,cartService,productService) {
        $scope.cartItems = fromLocal.getData("cartProduct");

        $scope.$parent.totalCount = productService.getTotalCount();

        $scope.totalMoney = cartService.getTotalMoney();

        $scope.changeCount = function (item) {
            cartService.changeCount(item);
            $scope.totalMoney = cartService.getTotalMoney();
            $scope.$parent.totalCount = productService.getTotalCount();
            $scope.cartItems = fromLocal.getData('cartProduct');
        }
    });
