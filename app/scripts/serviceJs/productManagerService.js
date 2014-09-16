angular.module('ngLetusgoApp').service('productManagerService', function (fromLocal, $location) {
  var items = fromLocal.getData('allProduct');
  this.delete = function (p_name) {

    var afterDeleteItems = _.filter(items, function (item) {
      return item.p_name != p_name;
    });
    fromLocal.setData('allProduct', afterDeleteItems);
  };

  this.toAdd = function () {
    $location.path('/addProduct');
  };

  this.getAllSort = function () {
    var allSort = fromLocal.getData('allSort');
    var sorts = [];
    _.forEach(allSort, function (sort) {
      sorts.push(sort.sname);
    });
    return sorts;
  };

  this.productInfo = function () {
    return {
      p_sort: '',
      p_name: '',
      p_price: '',
      p_unit: ''
    }
  };

  this.toUpdate = function (product) {
    $location.path('/updateProduct/' + product.p_name);
  };

  this.getProductByName = function (pname) {
    return _.filter(items, { 'p_name': pname });
  };

  this.doUpdate = function (product) {
    var allProducts = fromLocal.getData('allProduct');
    _.forEach(allProducts, function (products) {
      if (products.p_name == product.p_name) {
        products.p_sort = product.p_sort;
        products.p_price = product.p_price;
        products.p_unit = product.p_unit;
      }
    });
    fromLocal.setData('allProduct', allProducts);
  };

  this.addProduct = function (product) {
    var isTheRepeat = [];
    _.forEach(items, function (item) {
      if (item.p_name === product.p_name) {
        isTheRepeat = item.p_name;
      }
    });
    if (isTheRepeat == '') {
      items.push(product);
      fromLocal.setData('allProduct', allProducts);
    } else {
      alert(isTheRepeat + '已存在，不能重复添加');
    }
  }
});

