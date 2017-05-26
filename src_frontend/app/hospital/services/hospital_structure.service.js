'use strict';

(function() {
    angular
        .module('app')
        .factory('hospitalStructureService', hospitalStructureService);

    hospitalStructureService.$inject = ['$http', 'serverDomain'];

    function hospitalStructureService($http, serverDomain) {
        return {
            get : function(data) {
                data = data || {};

                return $http.get(serverDomain + 'hospitalStructure/get?id=' + data.id + '&type=' + data.type);
            },
            getByIdAndType : function(data) {
                return $http.get(serverDomain + 'hospitalStructure/getByIdAndType?id=' + data.id + '&type=' + data.type);
            },
            create : function(data) {
                return $http.post(serverDomain + 'hospitalStructure/create', data);
            },
            update : function(data) {
                return $http.post(serverDomain + 'hospitalStructure/edit', data);
            },
            deleteItem : function(data) {
                return $http.post(serverDomain + 'hospitalStructure/delete', data);
            }
        };
    }
})();
