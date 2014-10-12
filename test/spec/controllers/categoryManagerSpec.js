'use strict';
describe('CategoryManagerCtrl',function() {
  var $scope, CategoryManagerService, $location, createController, productManagerService,$controller;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      CategoryManagerService = $injector.get('CategoryManagerService');
      productManagerService = $injector.get('productManagerService');
      $location = $injector.get('$location');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('sortManagerCtrl', {
          $scope: $scope,
          $location: $location,
          CategoryManagerService: CategoryManagerService,
          productManagerService: productManagerService
        });
      };

    });
    allSort = [
      {sid: '1', sname: '水果'},
      {sid: '2', sname: '饮料'}
    ];
  });

  it ('it should load all sort', function () {
    spyOn(fromLocal,'getData').and.returnValue(allSort);
    createController();
    expect($scope.sorts).toEqual(allSort);
  });

  it ('it should add sort', function () {
    $scope.sort = {sid:'3',sname:'服装'};
    spyOn(fromLocal,'getData').and.returnValue(allSort);
    createController();
    $scope.addSort();
    expect(allSort.length).toEqual(3);
  });

  it('should come into sortManager after add sort', function () {
    createController();
    $scope.addSort();
    expect($location.path() === '/sortManager').toBe(true);
  });

  it ('it should delete the sort', function () {
    spyOn(sortManagerService,'delete').and.returnValue(allSort);
    spyOn(fromLocal,'getData').and.returnValue(allSort);
    createController();
    var sort = {sid:'1',sname:'水果'};
    $scope.delete(sort);
    expect(sortManagerService.delete).toHaveBeenCalledWith(sort);
  });

  it('should come into update when click the update button', function () {
    var sort = {sid:'1',sname:'水果'};
    createController();
    $scope.toUpdate(sort);
    expect($location.path() === '/updateSort/1').toBe(true);
  });
});

