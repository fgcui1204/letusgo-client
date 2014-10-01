'use strict';

/**
 * @ngdoc overview
 * @name ngLetusgoApp
 * @description
 * # ngLetusgoApp
 *
 * Main module of the application.
 */
angular
  .module('letusgo', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/homePage', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/productList',{
            templateUrl: 'views/product.html',
            controller: 'ProCtrl'
      })
      .when('/cart',{
         templateUrl: 'views/cart.html',
         controller: 'CartCtrl'
      })
      .when('/order',{
            templateUrl: 'views/order.html',
            controller: 'OrderCtrl'
      })
      .when('/productManager',{
        templateUrl: 'views/adminViews/productManager.html',
        controller: 'ProductManagerCtrl'
      })
      .when('/addProduct',{
        templateUrl: 'views/adminViews/addProduct.html',
        controller: 'addProductCtrl'
      })
      .when('/updateProduct/:barcode',{
        templateUrl: 'views/adminViews/updateProduct.html',
        controller: 'updateProduct'
      })
      .when('/sortManager',{
        templateUrl: 'views/adminViews/sortManager.html',
        controller: 'sortManagerCtrl'
      })
      .when('/addSort',{
        templateUrl: 'views/adminViews/addSort.html',
        controller: 'sortManagerCtrl'
      })
      .when('/updateSort/:id',{
        templateUrl: 'views/adminViews/updateSort.html',
        controller: 'updateSort'
      })
      .otherwise({
        redirectTo: '/homePage'
      });
  });
