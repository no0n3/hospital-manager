'use strict';

(function() {
    angular
        .module('app')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', 'authService', '$location', '$controller'];

    function SignupController($scope, authService, $location, $controller) {
        angular.extend(this, $controller('BaseController', {$scope: $scope}));

        $scope.loading = false;
        $scope.user = {};

        $scope.signup = function(form) {
            if (form.email.$valid && form.username.$valid && form.password.$valid) {
                $scope.loading = true;

                authService
                    .signup({
                        email : $scope.user.email,
                        username : $scope.user.username,
                        password : $scope.user.password
                    })
                    .then(function(resp) {
                        if (true === resp.data.success) {
                            $location.path('/login');
                        } else {
                            $scope.loading = false;
                        }
                    }, function() {
                        $scope.loading = false;
                    });
            }
        };

        $scope.goToLogin = function() {
            $location.path('/login');
        };
    }
})();
