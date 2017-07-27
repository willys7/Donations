(function() {
    'use strict';
    angular.module('Auth')
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        
        var login = {
            name : 'login',
            url : '/login',
            component : 'login'
        }
        $stateProvider.state(login);
        $urlRouterProvider.otherwise("/login");

    }   

})();