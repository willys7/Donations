(function() {
'use strict';
    angular.module("Donations", ['ngRoute','ui.bootstrap', 'ui.bootstrap.tpls']).config(config);
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