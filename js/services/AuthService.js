(function () {
'use strict';
	angular.module('Donations').factory('AuthService',authService);
        authService.$inject = ['$http','AuthRepository'];
        function authService($http, AuthRepository){
            var authModel = {
                apiKey: "",
                userKey: ""
            }
            var userAuthModel = {
                userName: "",
                password: "",
                compaignCode: "",
                apiKey: authModel.apiKey
            };
            
            var service = {
                getApiToken: getApiToken,
                setApiToken: setApiToken,
                setUserToken: setUserToken,
                setUser: setUser,
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

            function setUserToken(key){
                service.authModel.userKey = key;
            }

            function setUser(user){
                service.userAuthModel.userName = user.userName,
                service.userAuthModel.password = user.password,
                service.userAuthModel.compaignCode = user.compaignCode,
                service.userAuthModel.apiKey = service.authModel.apiKey
            }
        }
})();