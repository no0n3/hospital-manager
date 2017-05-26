'use strict';

(function() {
    angular
        .module('app')
        .controller('HospitalBranchViewController', HospitalBranchViewController);

    HospitalBranchViewController.$inject = ['$scope', '$routeParams', '$controller', 'hospitalStructureService'];

    function HospitalBranchViewController($scope, $routeParams, $controller, hospitalStructureService) {
        angular.extend(this, $controller('BaseController', {$scope: $scope}));

        $scope.hospital = null;
        $scope.loading = true;
        $scope.type = $routeParams.type;

        hospitalStructureService.get($routeParams)
            .then(function(resp) {
                $scope.hospital = resp.data.item;

                $scope.loading = false;
            }, function() {
                $scope.loading = false;
            });
    }
})();
