(function () {
'use strict';

	angular.module('Donations')
        .controller('AuthController',authController)
        //Nuevos servicios y repositorios
        authController.$inject = [
            "$scope",
            "AuthService"
        ];

        function authController($scope, AuthService){
            
        }
})();