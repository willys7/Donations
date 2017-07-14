(function () {
'use strict';

	angular.module('Donations')
        .controller('DonationController',donationController)
        //Nuevos servicios y repositorios
        donationController.$inject = [
            "$scope",
            "AuthService",
            "DonationService"
        ];

        function donationController($scope, AuthService, DonationService){
            var vm = this;
            vm.authModel = AuthService.getKeys();

            vm.donations = {};
            function getDonations(authModel){
                DonationService.getAllDonationsByUser(authModel).then(function(data){
                    vm.donations = data.Data;
                }).catch(function(err){
                    alert("Problems wirh the login")
                });
            }

        }
})();