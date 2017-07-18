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
            vm.amountOptions = {}
            getPaymentLabels();
            function getPaymentLabels(){
                PaymentService.getPaymentTypeLabels().then(function(data){
                    vm.paymentLabels = data;
                    vm.amountOptions = data.AmountQuestions[0].AmountOptions;
                    console.log(data);
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
})();