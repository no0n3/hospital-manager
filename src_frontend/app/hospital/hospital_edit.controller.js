'use strict';

(function() {
    angular
        .module('app')
        .controller('HospitalEditController', HospitalEditController);

    HospitalEditController.$inject = ['$scope', 'hospitalService', 'hospitalStructureService', '$routeParams', '$controller', '$location'];

    function HospitalEditController($scope, hospitalService, hospitalStructureService, $routeParams, $controller, $location) {
        angular.extend(this, $controller('BaseController', {$scope: $scope}));

        $scope.gettingData = true;
        $scope.loading = false;
        $scope.edited = false;
        $scope.hospital = {};

        hospitalService.getByUser($routeParams)
            .then(function(resp) {
                $scope.hospital = resp.data.hospital;

                $scope.gettingData = false;
            }, function() {
                $scope.gettingData = false;
            });

        function deleteDepartment(id) {
            for (var i in $scope.hospital.structure.hospital.clinics) {
                for (var j in $scope.hospital.structure.hospital.clinics[i].departments) {
                    if (id == $scope.hospital.structure.hospital.clinics[i].departments[j].id) {
                        $scope.hospital.structure.hospital.clinics[i].departments[j].is_deleted = 1;
                        return;
                    }
                }
            }
        }

        function deleteCabinet(id) {
            for (var i in $scope.hospital.structure.hospital.clinics) {
                for (var j in $scope.hospital.structure.hospital.clinics[i].departments) {
                    for (var x in $scope.hospital.structure.hospital.clinics[i].departments[j].cabinets) {
                        if (id == $scope.hospital.structure.hospital.clinics[i].departments[j].cabinets[x].id) {
                            $scope.hospital.structure.hospital.clinics[i].departments[j].cabinets[x].is_deleted = 1;
                            return;
                        }
                    }
                }
            }
        }

        $scope.deleteItem = function(data) {
            hospitalStructureService.deleteItem(data)
                .then(function(resp) {
                    if (true === resp.data.success) {
                        if ('clinic' === data.type) {
                            for (var i in $scope.hospital.structure.hospital.clinics) {
                                if (data.id == $scope.hospital.structure.hospital.clinics[i].id) {
                                    $scope.hospital.structure.hospital.clinics[i].is_deleted = 1;
                                    break;
                                }
                            }
                        } else if ('department' === data.type) {
                            deleteDepartment(data.id);
                        } else if ('cabinet' === data.type) {
                            deleteCabinet(data.id);
                        }
                    }
                });
        };

        $scope.editItem = function(data) {
            console.log('---x',data)
            if (-1 === ['clinic', 'department', 'cabinet'].indexOf(data.type)) {
                return;
            }

            $location.path('/hospital/' + data.type + '/edit').search({id : data.id});
        };

        $scope.addItem = function(data) {
            if (-1 === ['hospital', 'clinic', 'department'].indexOf(data.type)) {
                return;
            }

            var childType = null;

            if ('hospital' === data.type) {
                childType = 'clinic';
            } else if ('clinic' === data.type) {
                childType = 'department';
            } else if ('department' === data.type) {
                childType = 'cabinet';
            }

            $location.path('/hospital/' + childType + '/add').search({addTo : data.id});
        };

        $scope.update = function(form) {
            if (form.name.$valid && form.alt_name.$valid && form.description.$valid) {
                $scope.loading = true;

                hospitalService
                    .edit({
                        name : $scope.hospital.name,
                        alt_name : $scope.hospital.alt_name,
                        description : $scope.hospital.description,
                        id : $routeParams.id
                    })
                    .then(function(resp) {
                        if (true === resp.data.success) {
                            $scope.edited = true;
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
