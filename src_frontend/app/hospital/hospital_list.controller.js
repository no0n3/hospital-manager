'use strict';

(function() {
    angular
        .module('app')
        .controller('HospitalListController', HospitalListController);

    HospitalListController.$inject = ['$scope', '$rootScope', '$location', '$routeParams', '$controller', 'hospitalService'];

    function HospitalListController($scope, $rootScope, $location, $routeParams, $controller, hospitalService) {
        angular.extend(this, $controller('BaseController', {$scope: $scope}));

        $scope.hospitals = null;
        $scope.loading = true;

        if ('/hospitals/manage' === $location.path()) {
            if (!$rootScope.loggedUser) {
                $location.path('/');
            }

            $scope.canManage = true;
        }

        hospitalService[true === $scope.canManage ? 'getAllByUser' : 'getAll']()
            .then(function(resp) {
                $scope.hospitals = resp.data.hospitals;

                $scope.loading = false;
            }, function() {
                $scope.loading = false;
            });

        $scope.goToEditHospital = function(data) {
            $location.path('/hospital/edit/' + data.id);
        };

        $scope.deleteHospital = function(data) {
            hospitalService.deleteHospital(data)
                .then(function(resp) {
                    if (true === resp.data.success) {
                        for (var i in $scope.hospitals) {
                            if (data.id == $scope.hospitals[i].id) {
                                $scope.hospitals[i].is_deleted = 1;
                                break;
                            }
                        }
                    }
                });
        };
    }
})();
