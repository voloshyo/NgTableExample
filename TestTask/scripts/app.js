var mainmodule = angular.module('main', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ngTable']);


mainmodule.factory('getShortDataFctr', function ($http) {

    return $http.get('../data/products.txt');
});

mainmodule.factory('getLargeDataFctr', function ($http) {

    return $http.get('../data/productsLarge.txt');
});

mainmodule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
            .when('/index', { templateUrl: 'index.html'})
            .otherwise({ redirectTo: '/index' });
}]);




