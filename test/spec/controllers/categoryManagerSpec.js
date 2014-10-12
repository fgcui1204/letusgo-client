'use strict';
describe('CategoryManagerCtrl',function() {
  var $scope, CategoryManagerService, $location, createController, productManagerService,$controller,categories;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      CategoryManagerService = $injector.get('CategoryManagerService');
      productManagerService = $injector.get('productManagerService');
      $location = $injector.get('$location');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CategoryManagerCtrl', {
          $scope: $scope,
          $location: $location,
          CategoryManagerService: CategoryManagerService,
          productManagerService: productManagerService
        });
      };

    });

    categories = [
      {id: '2', name: '饮料'},
      {id: '3', name: '服装'}
    ];

    spyOn(CategoryManagerService,'getCategories').and.callFake(function(callback){
      callback(categories);
    });
  });

  it ('it should load all categories', function () {
    createController();
    CategoryManagerService.getCategories(function(data){
      $scope.categories = data;
      expect($scope.categories).toEqual(data);
    });
  });

  xit ('it should add sort', function () {
    $scope.sort = {sid:'3',sname:'服装'};
    spyOn(fromLocal,'getData').and.returnValue(allSort);
    createController();
    $scope.addSort();
    expect(allSort.length).toEqual(3);
  });

  xit('should come into sortManager after add sort', function () {
    createController();
    $scope.addSort();
    expect($location.path() === '/sortManager').toBe(true);
  });

  xit ('it should delete the sort', function () {
    spyOn(sortManagerService,'delete').and.returnValue(allSort);
    spyOn(fromLocal,'getData').and.returnValue(allSort);
    createController();
    var sort = {sid:'1',sname:'水果'};
    $scope.delete(sort);
    expect(sortManagerService.delete).toHaveBeenCalledWith(sort);
  });

  xit('should come into update when click the update button', function () {
    var sort = {sid:'1',sname:'水果'};
    createController();
    $scope.toUpdate(sort);
    expect($location.path() === '/updateSort/1').toBe(true);
  });
});

