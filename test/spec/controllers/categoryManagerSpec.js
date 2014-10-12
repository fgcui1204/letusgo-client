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

  it ('it should call category', function () {
    var category = {
      id:'',
      name:''
    };
    spyOn(CategoryManagerService,'category').and.returnValue(category);
    createController();
    expect(CategoryManagerService.category()).toBe(category);
  });

  it('should call add method', function () {
    spyOn(CategoryManagerService,'add');
    createController();

    $scope.add();
    expect(CategoryManagerService.add.calls.count()).toBe(1);
  });

  it('should call judge method', function () {
    spyOn(productManagerService,'judgeIfHaveItems');
    createController();

    $scope.delete();
    expect(productManagerService.judgeIfHaveItems.calls.count()).toBe(1);
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

