(function () {
'use strict';

	angular.module('Donations')
        .controller('AuthController',authController)
        .component("login",{
            templateUrl: '/views/login.html',
            controller: 'AuthController',
            controllerAs: 'vmAuth'
        });
        //Nuevos servicios y repositorios
        authController.$inject = [
            "$scope",
            "AuthService",
            "$state"
        ];

        function authController($scope, AuthService, $state){
            var vm = this;
            AuthService.setApiToken();
            
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
                    $state.go("home");
                    
                }).catch(function(err){
                    alert("Please enter your correct credentials");
                });

                
            }

        }
})();