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
        }
})();