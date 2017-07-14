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
        .when("/home", {
            controller: 'DonationController',
            templateUrl : "views/home.html",
            controllerAs : "vmDonation"
        })
        .otherwise ({
        redirectTo: '/login'
        });
    };
})();