'use strict';

(function() {
    angular
        .module('app')
        .controller('HospitalBranchCreateController', HospitalBranchCreateController);

    HospitalBranchCreateController.$inject = ['$scope', 'hospitalStructureService', '$location', '$routeParams', '$controller'];

    function HospitalBranchCreateController($scope, hospitalStructureService, $location, $routeParams, $controller) {
        angular.extend(this, $controller('BaseHospitalController', {$scope: $scope}));

        $scope.loading = false;
        $scope.added = false;
        $scope.hospital = {};

        $scope.create = -1 === ['/hospital/clinic/add', '/hospital/department/add', '/hospital/cabinet/add'].indexOf($location.path()) ?
            false :
            true;

        $scope.validType = $scope.isValidType($routeParams.type);

        if (false === $scope.create) {
            hospitalStructureService.getByIdAndType($routeParams)
                .then(function(resp) {
                    if (resp.data.item) {
                        $scope.hospital = resp.data.item;
                    }

                    $scope.gettingData = false;
                }, function() {
                    $scope.gettingData = false;
                });
        }

        $scope.update = function(form) {
            if (form.name.$valid && form.alt_name.$valid && form.description.$valid) {
                $scope.loading = true;

                hospitalStructureService
                    [$scope.create ? 'create' : 'update']({
                        name : $scope.hospital.name,
                        alt_name : $scope.hospital.alt_name,
                        description : $scope.hospital.description,
                        addTo : $routeParams.addTo,
                        type : $scope.type,
                        id : $routeParams.id
                    })
                    .then(function(resp) {
                        if (true === resp.data.success) {
                            $scope.added = true;
                        } else {
                            $scope.loading = false;
                        }
                    }, function() {
                        $scope.loading = false;
                    });
            }
        };
    }
})();
