(function () {
'use strict';
	angular.module('Donations').factory('CountryRepository',countryRepository);
        countryRepository.$inject = ['$http','AuthService'];
        function countryRepository($http, AuthService){
            

            var repository = {
                getCountries : getCountries,
                getUSStates : getUSStates
            };
            
            return repository;

            function getCountries(){
                var authModel = AuthService.getKeys();
                return $http({
                    
                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Configuration/Countries",
                    "data" : {},
                    "params" : {
                        'donorToken': authModel.userKey,
                        'apiKey' : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
                    },
                    "headers": {
                        'Authorization': "Bearer " +  authModel.apiKey
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
                var authModel = AuthService.getKeys();
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Configuration/USStates",
                    "data" : {},
                    "params" : {
                        'donorToken': authModel.userKey,
                        'apiKey' : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
                    },
                    "headers": {
                        'Authorization': "Bearer " +  authModel.apiKey
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