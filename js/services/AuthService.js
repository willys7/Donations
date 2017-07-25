(function () {
'use strict';
	angular.module('Donations').factory('AuthService',authService);
        authService.$inject = ['$http','AuthRepository'];
        function authService($http, AuthRepository){
            var authModel = {
                apiKey: "",
                userKey: "",
                status: 500
            }
            var userAuthModel = {
                userName: "",
                password: "",
                campaingCode: "",
                apiKey: authModel.apiKey
            };
            
            var service = {
                getKeys: getKeys,
                setApiToken: setApiToken,
                setUserToken: setUserToken,
                authenticateUser: authenticateUser,
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

            function getKeys(){
                return service.authModel;
            }

            function authenticateUser(){
                var keyValue = "";
                return AuthRepository.authenticateUser(service.userAuthModel).then(function(data){
                    if(data.status != 200){
                        return data;
                    }
                    else{
                        keyValue = data.data.Data.DonorToken;
                        service.authModel.userKey = keyValue;
                        service.authModel.status = data.status;
                    }
                    return data;
                }).catch(function(err){
                    console.log(err);
                    return err;
                    
                });
                
            }

            function setUserToken(key){
                service.authModel.userKey = key;
            }

            function setUser(user){
                service.userAuthModel.userName = user.userName,
                service.userAuthModel.password = user.password,
                service.userAuthModel.campaingCode = user.campaingCode,
                service.userAuthModel.apiKey = service.authModel.apiKey
            }
        }
})();