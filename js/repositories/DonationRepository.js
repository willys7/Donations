(function () {
'use strict';
	angular.module('Donations').factory('DonationRepository',donationRepository);
        donationRepository.$inject = ['$http','AuthService'];
        function donationRepository($http, AuthService){
            
            var repository = {
                getAllDonationsByUser : getAllDonationsByUser,
                getOrganizations : getOrganizations,
                addDonation : addDonation,
                authModel : AuthService.getKeys()
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

            function addDonation(payment){
                var authModel = AuthService.getKeys();
                
                return $http({

                    "method": "POST", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Donation/Save",
                    "data" : payment,
                    "params" : {
                        'donorToken': authModel.userKey,
                        'ipAddress': "192.192.192.192",
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