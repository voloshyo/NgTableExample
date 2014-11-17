mainmodule
    .directive('storetable', function () {
        return {
            restrict: "E",
            templateUrl: '../views/storetable.html'
        };
    })

.controller('storetableCtrl', function ($scope, $rootScope, ngTableParams, $filter) {

    function init() {
        var rs = $rootScope;
        $scope.mode = 'short';
        $scope.products = rs.shlist;
        $scope.currentPage = 1;
        $scope.productsToView = function() { return $scope.products.slice(0, 50); };
    };
    init();
    

    $scope.$watch('mode', function() {
        if ($scope.mode === 'short') {
            $scope.products = $rootScope.shlist;
        };
        
        if ($scope.mode === 'large') {
            $scope.products =  $rootScope.llist;
        };
            $scope.productsToView = function() { return $scope.products.slice((($scope.currentPage - 1) * 50), ($scope.currentPage) * 50); };
    });


    //var data = $scope.productsToView();

    //$scope.tableParams = new ngTableParams({
    //    page: 1,            // show first page
    //    count: 10,          // count per page
    //    sorting: {
    //        name: 'asc'     // initial sorting
    //    }
    //}, {
    //    total: data.length, // length of data
    //    getData: function ($defer, params) {
    //        // use build-in angular filter
    //        var orderedData = params.sorting() ?
    //                            $filter('orderBy')(data, params.orderBy()) :
    //                            data;

    //        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    //    }
    //});
})
