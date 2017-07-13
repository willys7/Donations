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
            var vm = this;
            AuthService.setApiToken();
            
            vm.login = login;
            function login(){
                if(!vm.userName || vm.UserName !== "redriver" ){
                    return
                }
                if(!vm.password || vm.password !== "p@ssword" ){
                    return
                }
                if(!vm.compaingCode || vm.compaingCode !== "72001" ){
                    return
                }
                vm.user = {
                    userName: vm.userName,
                    password: vm.password,
                    compaingCode: vm.compaingCode
                }
                AuthService.setUser(user)
            }

        }
})();