(function () {
'use strict';
	angular.module('Donations').factory('DonationRepository',donationRepository);
        donationRepository.$inject = ['$http','AuthService'];
        function donationRepository($http, AuthService){
            var repository = {
                getAllDonationsByUser : getAllDonationsByUser,
                getOrganizations : getOrganizations
            };

            return repository;

            function getAllDonationsByUser(){
                var authModel = AuthService.getKeys();
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Donor/GivingHistory",
                    "data" : {},
                    "params" : {
                        'donorToken': authModel.userKey,
                        "apiKey" : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
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

            function getOrganizations(){
                var authModel = AuthService.getKeys();
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Configuration/IntroductoryPanel",
                    "data" : {},
                    "params" : {
                        'donorToken': authModel.userKey,
                        "apiKey" : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
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