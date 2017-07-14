(function () {
'use strict';

	angular.module('Donations')
        .controller('AuthController',authController)
        //Nuevos servicios y repositorios
        authController.$inject = [
            "$scope",
            "AuthService",
            "$location"
        ];

        function authController($scope, AuthService, $location){
            var vm = this;
            AuthService.setApiToken();
            vm.authModel = AuthService.getKeys();
            
            vm.login = login;
            function login(){
                if(!vm.userName || vm.userName !== "redriver" ){
                    alert("Please enter your correct credentials");
                    return 
                }
                if(!vm.password || vm.password !== "p@ssword" ){
                    alert("Please enter your correct credentials");
                    return
                }
                if(!vm.campaingCode || vm.campaingCode !== "72001" ){
                    alert("Please enter your correct credentials");
                    return
                }
                vm.user = {
                    userName: vm.userName,
                    password: vm.password,
                    campaingCode: vm.campaingCode
                }
                AuthService.setUser(vm.user);
                AuthService.authenticateUser().then(function(data){
                    $location.path("/home");
                    
                }).catch(function(err){
                    alert("Please enter your correct credentials");
                });

                
            }

        }
})();