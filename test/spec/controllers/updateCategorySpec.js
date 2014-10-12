'use strict';

describe('UpdateCategoryCtrl',function() {
  var $scope, $location,CategoryManagerService, $routeParams, createController, categories;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $location = $injector.get('$location');
      CategoryManagerService = $injector.get('CategoryManagerService');
      $routeParams = $injector.get('$routeParams');
      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('UpdateCategoryCtrl', {
          $scope: $scope,
          $location: $location,
          $routeParams: $routeParams,
          CategoryManagerService: CategoryManagerService
        });
      };
    });
    categories = [
      {id:'1',name:'水果'},
      {id:'2',name:'饮料'}
    ];
  });
  xit ('it should get sort by id', function () {
    var sort = {sid:'1',sname:'水果'};
    spyOn(sortManagerService,'getSortById').and.returnValue(sort);
    $routeParams.sid = 1;
    createController();
    expect($scope.sort).toEqual(sort);
  });

  xit ('it should update sort info', function () {
    $scope.sort = {sid:'1',sname:'服装'};
    spyOn(sortManagerService,'doUpdate').and.returnValue(allSort);
    createController();
    console.log(allSort);
    expect($scope.sort).toEqual(sort);
  });
});
