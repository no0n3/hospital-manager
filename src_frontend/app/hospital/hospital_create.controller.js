'use strict';

(function() {
    angular
        .module('app')
        .controller('HospitalCreateController', HospitalCreateController);

    HospitalCreateController.$inject = ['$scope', 'hospitalService', '$location', '$controller'];

    function HospitalCreateController($scope, hospitalService, $location, $controller) {
        angular.extend(this, $controller('BaseController', {$scope: $scope}));

        $scope.loading = false;
        $scope.added = false;
        $scope.hospital = {};

        $scope.create = function(form) {
            if (form.name.$valid && form.alt_name.$valid && form.description.$valid) {
                $scope.loading = true;

                hospitalService
                    .create({
                        name : $scope.hospital.name,
                        alt_name : $scope.hospital.alt_name,
                        description : $scope.hospital.description
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
