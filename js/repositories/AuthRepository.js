(function () {
'use strict';
	angular.module('Donations').factory('AuthRepository',authRepository);
        authRepository.$inject = ['$http'];
        function authRepository($http){

            var repository = {
                getAuthApp: getAuthApp,
                authenticateUser: authenticateUser
            };
            return repository;


            function getAuthApp(){
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Application/Authenticate",
                    "data" : {},
                    "params" : {
                        "apiKey" : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
                    },
                    "headers": {
                        'Authorization': "Basic dmlhcm86cEBzc3dvcmQ="
                    }
                }).then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });

            }

            function authenticateUser(user){
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Donor/Authenticate",
                    "data" : {},
                    "params" : {
                        "username" : user.userName,
                        "password" : user.password,
                        "campaignCode" : user.campaingCode,
                        "apiKey" : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
                    },
                    "headers": {
                        'Authorization': "Bearer " +  user.apiKey
                    }
                }).then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });
            }
            function success(data){
                return data;  
            }
            function error(err){
                console.log(err);
                return err;
            }
            
        }

})();

