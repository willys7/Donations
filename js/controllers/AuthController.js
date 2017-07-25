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
            "$state",
            'blockUI'
        ];

        function authController($scope, AuthService, $state,blockUI){
            var vm = this;
            vm.loginBlockUI = blockUI.instances.get('loginBlock');
            

            AuthService.setApiToken();
            
            vm.login = login;
            vm.activate = activate;
            vm.closeAlert =  closeAlert

            function activate() {
                vm.loginBlockUI.start();
                login();
            }
            function closeAlert() {
              vm.alert = null;
            };
            function login(){
                if(!vm.userName || vm.userName !== "redriver" ){
                    vm.alert = "Please enter your correct credentials";
                    return 
                }
                if(!vm.password || vm.password !== "p@ssword" ){
                    vm.alert = "Please enter your correct credentials";
                    return
                }
                if(!vm.campaingCode || vm.campaingCode !== "72001" ){
                    vm.alert = "Please enter your correct credentials";
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
                    vm.alert = "Please enter your correct credentials";
                }).finally(function () {
                    vm.loginBlockUI.stop();
                });


                
            }

        }
})();