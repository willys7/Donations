(function () {
'use strict';

	angular.module('Donations')
        .controller('DonationController',donationController)
        //Nuevos servicios y repositorios
        donationController.$inject = [
            "$scope",
            "AuthService",
            "DonationService",
            "PaymentService"
        ];

        function donationController($scope, AuthService, DonationService, PaymentService){
            var vm = this;
            vm.paymentLabels = {}
            getPaymentLabels();
            function getPaymentLabels(){
                PaymentService.getPaymentTypeLabels().then(function(data){
                    vm.paymentLabels = data;
                    console.log(data);
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
})();