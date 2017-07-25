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
            'blockUI',
            '$timeout'
        ];

        function authController($scope, AuthService, $state, blockUI, $timeout){
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
                
                vm.user = {
                    userName: vm.userName,
                    password: vm.password,
                    campaingCode: vm.campaingCode
                }
                AuthService.setUser(vm.user);
                AuthService.authenticateUser().then(function(data){
                    if(data.status != 200){
                        $timeout(function() { 
                          throw new Error('Bad Credentials'); 
                          vm.loginBlockUI.stop(); // Stop will never be called 
                        }, 1000);
                        vm.alert = "Please enter your correct credentials";
                    }
                    else{
                        $state.go("home");
                    }
                    
                    
                }).catch(function(err){
                    $timeout(function() { 
                      throw new Error('Oh dear!'); 
                      vm.loginBlockUI.stop(); // Stop will never be called 
                    }, 1000);// Stop will never be called 
                    vm.alert = "Please enter your correct credentials";
                }).finally(function () {
                    vm.loginBlockUI.stop();
                });


                
            }

        }
})();