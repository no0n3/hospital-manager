'use strict';

(function () {
    angular
        .module('app', ['ngRoute', 'app.routes', 'app.templates'])
        .run(run);

    run.$inject = ['$rootScope', '$location', '$route', 'siteDomain'];

    function run($rootScope, $location, $route, siteDomain) {
        $rootScope.siteDomain = siteDomain;

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            
        });

    }
})();
