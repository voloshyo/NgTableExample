mainmodule
    .directive('storetable', function () {
        return {
            restrict: "E",
            templateUrl: '../views/storetable.html',
            scope: {
                mode: '='
            },

            controller: function ($scope, getShortDataFctr, getLargeDataFctr, ngTableParams, $filter) {
                $scope.products = [];
                $scope.productsshort = [];
                $scope.productslarge = [];

                getShortDataFctr.success(function (data) {
                    $scope.mode = "short";
                    $scope.products = parseData(data);
                    $scope.productsshort = parseData(data);
                    $scope.currentPage = 1;
                });

                getLargeDataFctr.success(function (data) {
                    $scope.productslarge = parseData(data);
                });

                function parseData(data) {
                    var arr = [];
                    var arrProps = [];
                    var arrTitles = [];
                    var headers = _(data).first();
                    _(headers).each(function(header) {
                        arrProps.push(header.field);
                        arrTitles.push(header.title);
                    });

                    var prods = data.slice(1, data.length);

                    _(prods).each(function (prod) {
                        var arrValues = prod;
                        var obj = _.object(arrProps, arrValues);
                        arr.push(obj);
                    });
                    $scope.headers = arrTitles;

                    return arr;
                };

                $scope.$watch('mode', function () {
                    if ($scope.mode === 'short') {
                        $scope.products = $scope.productsshort;
                    };
                    if ($scope.mode === 'large') {
                        $scope.products = $scope.productslarge;
                    };
                });


                $scope.tableParams = new ngTableParams({
                    page: 1,            
                    count: 50,
                    sorting: {
                        id: 'asc' 
                    }
                }, {
                    getData: function ($defer, params) {
                        $scope.products = params.sorting() ?
                                            $filter('orderBy')($scope.products, params.orderBy()) : $scope.products;
                        $defer.resolve( $scope.products);
                    }
                });
            }
        };
    });

