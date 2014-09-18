'use strict';

describe("updateSort",function() {
  var $scope, fromLocal, $location,sortManagerService, $routeParams, createController, allProduct, allSort;
  beforeEach(function () {
    module('ngLetusgoApp');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $location = $injector.get('$location');
      fromLocal = $injector.get('fromLocal');
      sortManagerService = $injector.get('sortManagerService');
      $routeParams = $injector.get('$routeParams');
      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('updateSort', {
          $scope: $scope,
          $location: $location,
          fromLocal: fromLocal,
          $routeParams: $routeParams,
          sortManagerService: sortManagerService
        });
      };

    });
    allSort = [{sid:'1',sname:'水果'},{sid:'2',sname:'饮料'}];
  });
  xit ('it should get sort by id', function () {
    var sort = {sid:'1',sname:'水果'};
    spyOn(sortManagerService,'getSortById').andReturn(sort);
    $routeParams.sid = 1;
    createController();
    expect($scope.sort).toEqual(sort);
  });

  xit ('it should update sort info', function () {
    $scope.sort = {sid:'1',sname:'服装'};
    spyOn(sortManagerService,'doUpdate').andReturn(allSort);
    createController();
    console.log(allSort);
    expect($scope.sort).toEqual(sort);
  });
});
