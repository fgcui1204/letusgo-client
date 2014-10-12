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

    spyOn(CategoryManagerService, 'getCategories').and.callFake(function (callback) {
      callback(categories);
    });
  });

  it ('it should get sort by id', function () {
    var category = {id:'1',name:'水果'};
    var params = 1;
    spyOn(CategoryManagerService,'getCategoryById').and.callFake(function(params,callback) {
      callback(category);
    });
    createController();
    CategoryManagerService.getCategoryById(params,function(data){
      expect($scope.category).toEqual(data);
    });
  });

  xit ('it should update sort info', function () {
    $scope.sort = {sid:'1',sname:'服装'};
    spyOn(sortManagerService,'doUpdate').and.returnValue(allSort);
    createController();
    console.log(allSort);
    expect($scope.sort).toEqual(sort);
  });
});
