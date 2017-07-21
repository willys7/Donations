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
            vm.today = new Date();
            var dd = vm.today.getDate();
            var mm = vm.today.getMonth()+1; //January is 0!

            var yyyy = vm.today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            vm.todayDate = "Billed on " + dd+'/'+mm+'/'+yyyy;
            PaymentService.getPaymentTypeLabels().then(function(data){
                vm.info = data;
            }).catch(function(err){
                console.log(err);
            });
        }
})();