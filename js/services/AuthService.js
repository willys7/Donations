(function () {
'use strict';
	angular.module('Donations').factory('AuthService',authService);
        authService.$inject = ['$http','AuthRepository'];
        function authService($http, AuthRepository){
            var authModel = {
                apiKey:""
            }
            var userAuthModel = {
                username: "",
                password: "",
                campaignCode: "",
                apiKey: authModel.apiKey

            };
            
            var service = {
                getApiToken: getApiToken,
                setApiToken: setApiToken,
                authModel: authModel,
                userAuthModel: userAuthModel
            }

            return service 

            function setApiToken(){
                var realData = "";
                AuthRepository.getAuthApp().then(function(data){
                    realData = data.data;
                    service.authModel.apiKey = realData;
                });
                
            }

            function getApiToken(){
                return service.authModel;
            }
        }
})();