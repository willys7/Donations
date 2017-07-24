(function() {
    'use strict';
    angular.module('Donations')
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        
        var login = {
            name : 'login',
            url : '/login',
            component : 'login'
        }
        var homeState = {
            name : 'home',
            url : '/home',
            component : 'homeComponent'
        };
        
        var donationState = {
            name : 'addDonation',
            url : '/AddDonation',
            component : 'donationComponent'
        };
        var agenciesState = {
            name : 'agencies',
            url : '/agencies',
            component : 'agenciesComponent'
        }
        var previewState = {
            name : 'preview',
            url : '/preview',
            component : 'previewComponent'
        };

        $stateProvider.state(login);
        $stateProvider.state(homeState);
        $stateProvider.state(donationState);
        $stateProvider.state(agenciesState);
        $stateProvider.state(previewState);
        $urlRouterProvider.otherwise("/login");
    }
})();