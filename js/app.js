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
            controller: 'HomeController',
            templateUrl : "views/home.html",
            controllerAs : "vmHome"
        })
        .when("/AddDonation", {
            controller: 'DonationController',
            templateUrl : "views/addDonation.html",
            controllerAs : "vmDonation"
        })
        .when("/agencies", {
            controller: 'AgenciesController',
            templateUrl : "views/agencies.html",
            controllerAs : "vmaAgencies"
        })
        .otherwise ({
        redirectTo: '/login'
        });
    };
})();