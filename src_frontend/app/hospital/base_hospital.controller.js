'use strict';

(function() {
    angular
        .module('app')
        .controller('BaseHospitalController', BaseHospitalController);

    BaseHospitalController.$inject = ['$scope', '$routeParams', '$controller'];

    function BaseHospitalController($scope, $routeParams, $controller) {
        angular.extend(this, $controller('BaseController', {$scope: $scope}));

        var validStructureTypes = [
            'clinic',
            'department',
            'cabinet'
        ];

        $scope.type = $routeParams.type;

        $scope.isValidType = function(type) {
            return -1 !== validStructureTypes.indexOf(type);
        };
    }
})();
