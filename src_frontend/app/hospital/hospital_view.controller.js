'use strict';

(function() {
    angular
        .module('app')
        .controller('HospitalViewController', HospitalViewController);

    HospitalViewController.$inject = ['$scope', '$routeParams', '$controller', 'hospitalService'];

    function HospitalViewController($scope, $routeParams, $controller, hospitalService) {
        angular.extend(this, $controller('BaseController', {$scope: $scope}));

        $scope.hospital = null;
        $scope.loading = true;

        hospitalService.get($routeParams)
            .then(function(resp) {
                $scope.hospital = resp.data.hospital;

                $scope.loading = false;
            }, function() {
                $scope.loading = false;
            });
    }
})();
