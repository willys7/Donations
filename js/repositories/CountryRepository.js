(function () {
'use strict';
	angular.module('Donations').factory('CountryRepository',countryRepository);
        countryRepository.$inject = ['$http','AuthService'];
        function countryRepository($http, AuthService){
            var authModel = AuthService.getKeys();

            var repository = {
                getCountries : getCountries,
                getUSStates : getUSStates,
                authModel = authModel
            };
            
            return repository;

            function getCountries(){
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Configuration/Countries",
                    "data" : {},
                    "params" : {
                        'donorToken': repository.authModel.userKey,
                        'apiKey' : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
                    },
                    "headers": {
                        'Authorization': "Bearer " +  repository.authModel.apiKey
                    }
                }).then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });
            }
            
            function getUSStates(){
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Configuration/USStates",
                    "data" : {},
                    "params" : {
                        'donorToken': repository.authModel.userKey,
                        'apiKey' : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
                    },
                    "headers": {
                        'Authorization': "Bearer " +  repository.authModel.apiKey
                    }
                }).then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });
            }
        }
})();