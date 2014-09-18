'use strict'
describe("sortManagerCtrl",function() {
  var $scope, fromLocal, sortManagerService, $location, createController, allSort;
  beforeEach(function () {
    module('ngLetusgoApp');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      fromLocal = $injector.get('fromLocal');
      sortManagerService = $injector.get('sortManagerService');
      $location = $injector.get('$location')
      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('sortManagerCtrl', {
          $scope: $scope,
          fromLocal: fromLocal,
          $location: $location,
          sortManagerService: sortManagerService
        });
      };

    });
    allSort = [
      {sid: '1', sname: '水果'},
      {sid: '2', sname: '饮料'}
    ];
  });

  it ('it should load all sort', function () {
    spyOn(fromLocal,'getData').andReturn(allSort);
    createController();
    expect($scope.sorts).toEqual(allSort);
  });

  it ('it should add sort', function () {
    $scope.sort = {sid:'3',sname:'服装'};
    spyOn(fromLocal,'getData').andReturn(allSort);
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
    spyOn(sortManagerService,'delete').andReturn(allSort);
    spyOn(fromLocal,'getData').andReturn(allSort);
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

