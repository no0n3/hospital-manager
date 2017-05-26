'use strict';

(function() {
    angular
        .module('app')
        .factory('hospitalService', hospitalService);

    hospitalService.$inject = ['$http', 'serverDomain'];

    function hospitalService($http, serverDomain) {
        return {
            getAll : function(data) {
                return $http.get(serverDomain + 'hospital/getAll', data);
            },
            getAllByUser : function(data) {
                return $http.get(serverDomain + 'hospital/getAllByUser', data);
            },
            getByUser : function(data) {
                return $http.get(serverDomain + 'hospital/getByUser?id=' + data.id);
            },
            get : function(data) {
                data = data || {};

                return $http.get(serverDomain + 'hospital/get?id=' + data.id);
            },
            create : function(data) {
                return $http.post(serverDomain + 'hospital/create', data);
            },
            edit : function(data) {
                return $http.post(serverDomain + 'hospital/edit', data);
            },
            deleteHospital : function(data) {
                return $http.post(serverDomain + 'hospital/delete', data);
            }
        };
    }
})();
