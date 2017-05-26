'use strict';

(function() {
    angular
        .module('app')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$scope', '$rootScope', 'authService', '$location'];

    function BaseController($scope, $rootScope, authService, $location) {
        $scope.headerUrl = 'app/header/views/main.html';

        $scope.logout = function() {
            authService.logout()
                .then(function(resp) {
                    if (true === resp.data.success) {
                        $location.path('/');
                    }
                });
        };

        authService.getLoggedUserData()
            .then(function(resp) {
                $rootScope.loggedUser = resp.data.user;
            });
    }
})();
