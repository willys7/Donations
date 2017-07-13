(function() {
'use strict';
    angular.module("Donations", ['ngRoute']).config(config);
    function config($routeProvider) {
        $routeProvider
        .when("/login", {
            controller: 'AuthController',
            templateUrl : "views/login.html",
            controllerAs : "vmAuth"
        })
        .otherwise ({
        redirectTo: '/login'
        });
    };
})();