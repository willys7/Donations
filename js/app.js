(function() {
'use strict';
    angular.module("SuggestionBox", ['ngRoute']).config(config);
    function config($routeProvider) {
        $routeProvider
        .when("/login", {
            controller: 'AuthController',
            templateUrl : "views/login.html",
            controllerAs : "vmAuth"
        })
        .otherwise ({
        redirectTo: '/home'
        });
    };
})();