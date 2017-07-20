(function () {
'use strict';

	angular.module('Donations')
        .controller('PreviewController',previewController)
        //Nuevos servicios y repositorios
        previewController.$inject = [
            "$scope",
            "AuthService",
            "CountryService",
            "DonationService",
            "PaymentService",
            "$location"
        ];

        function previewController($scope, AuthService, CountryService, DonationService, PaymentService, $location){
            var vm = this;
            vm.payment = DonationService.getPaymentConfig();
            vm.agency = DonationService.getAgencyDetails();
        }
})();