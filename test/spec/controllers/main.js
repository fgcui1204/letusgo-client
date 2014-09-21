'use strict';

describe('Controller: MainCtrl', function () {
  var $scope, productService, createController;

  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('MainCtrl', {
          $scope: $scope,
          productService: productService
        });
      };
    });
  });


  it('should attach a list of awesomeThings to the scope', function () {
    spyOn(productService, 'getTotalCount').and.returnValue(2);
    createController();
    expect($scope.totalCount).toBe(2);
  });
});
