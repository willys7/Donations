(function () {
'use strict';
	angular.module('Donations').factory('DonationService',donationService);
        donationService.$inject = ['$http','DonationRepository'];
        function donationService($http, DonationRepository){
            var donations = {};
            var orgs = {};
            var service = {
                getAllDonationsByUser :  getAllDonationsByUser,
                getOrganizations : getOrganizations,
                donations : donations,
                orgs : orgs
            }
            
            return service

            function getAllDonationsByUser(){
                return DonationRepository.getAllDonationsByUser().then(function(data){
                    service.donations = data.data.Data.PledgeList;
                    return service.donations;
                }).catch(function(err){
                    console.log(err);
                });

                
            }

            function getOrganizations(){
                return DonationRepository.getOrganizations().then(function(data){
                    service.orgs = data.data.Data;
                    return service.orgs;
                }).catch(function(err){
                    console.log(err);
                });
            }

            
        }
})();