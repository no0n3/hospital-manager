'use strict';

(function() {
    angular
        .module('app.routes', ['ngRoute', ])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config ($routeProvider, $locationProvider) {
        $locationProvider
            .hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'app/hospital/views/hospital_list.html',
                controller: 'HospitalListController'
            })
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginController'
            })
            .when('/sign-up', {
                templateUrl: 'app/signup/signup.html',
                controller: 'SignupController'
            })
            .when('/hospitals', {
                templateUrl: 'app/hospital/views/hospital_list.html',
                controller: 'HospitalListController'
            })
            .when('/hospitals/manage', {
                templateUrl: 'app/hospital/views/hospital_list.html',
                controller: 'HospitalListController'
            })
            .when('/hospital/view/:id', {
                templateUrl: 'app/hospital/views/view.html',
                controller: 'HospitalViewController'
            })
            .when('/hospital/add', {
                templateUrl: 'app/hospital/views/add.html',
                controller: 'HospitalCreateController'
            })
            .when('/hospital/edit/:id', {
                templateUrl: 'app/hospital/views/edit.html',
                controller: 'HospitalEditController'
            })
            .when('/hospital/:type/add', {
                templateUrl: 'app/hospital/views/edit_branch.html',
                controller: 'HospitalBranchCreateController'
            })
            .when('/hospital/:type/edit', {
                templateUrl: 'app/hospital/views/edit_branch.html',
                controller: 'HospitalBranchCreateController'
            })
            .when('/hospital-branch/:type/:id', {
                templateUrl: 'app/hospital/views/view_branch.html',
                controller: 'HospitalBranchViewController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
