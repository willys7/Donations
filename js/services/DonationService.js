(function () {
'use strict';
	angular.module('Donations').factory('DonationService',donationService);
        donationService.$inject = ['$http','DonationRepository'];
        function donationService($http, DonationRepository){
            var service = {
                getAllDonationsByUser:  getAllDonationsByUser
            }
            return service

            function getAllDonationsByUser(authModel){
                var donations = {};
                return DonationRepository.getAllDonationsByUser(authModel).then(
                    function(data){
                    donations = data.Data;
                }).cath(function(err){
                    console.log(err);
                });
            }
        }
})();