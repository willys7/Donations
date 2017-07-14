(function () {
'use strict';
	angular.module('Donations').factory('DonationRepository',donationRepository);
        donationRepository.$inject = ['$http'];
        function donationRepository($http){
            var repository = {
                getAllDonationsByUser: getAllDonationsByUser
            };

            return repository;

            function getAllDonationsByUser(authModel){
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Donor/GivingHistory",
                    "data" : {},
                    "params" : {
                        'apiKey': authModel.apiKey,
                        'donorToken': authModel.userKey
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
        }
})();