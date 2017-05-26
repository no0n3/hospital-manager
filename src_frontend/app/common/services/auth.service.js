'use strict';

(function() {
    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', 'serverDomain'];

    function authService($http, serverDomain) {
        return {
            login : function(data) {
                return $http.post(serverDomain + 'main/login', data);
            },
            logout : function(data) {
                return $http.post(serverDomain + 'main/logout', data);
            },
            signup : function(data) {
                return $http.post(serverDomain + 'main/signup', data);
            },
            getLoggedUserData : function() {
                return $http.get(serverDomain + 'main/user');
            }
        };
    }
})();
