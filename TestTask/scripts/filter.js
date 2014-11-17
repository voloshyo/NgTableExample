mainmodule.filter('filterdata',
    function () {
        return function (products, currentpage) {
           var pr = products.slice(((currentpage - 1) * 50), (currentpage) * 50);
           return pr;
    }
});