var mainmodule = angular.module('main', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ngTable']);

mainmodule.factory('getData', function ($http) {

    return {
        shortData:  $http.get('../data/products.txt'),
        largeData: $http.get('../data/productsLarge.txt')
       };
});

mainmodule.controller('mainCtrl', function ($rootScope, $q, getData) {

    var ppromises = [getData.shortData, getData.largeData];

    $q.all(ppromises).then(function (result) {
        var tmp = [];
        angular.forEach(result, function (responce) {
            tmp.push(responce.data);
        });
        return tmp;
    }).then(function (tempRes) {
        var t = [];
        _(tempRes).each(function (item) { t.push(item); });
        return t;
    }).then(function (tmpr) {
        $rootScope.shlist = tmpr[0];
        $rootScope.llist = tmpr[1];
    });
});



