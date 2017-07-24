(function () {
'use strict';

	angular.module('Donations')
        .controller('PreviewController',previewController)
        .component('previewComponent',{
            templateUrl: '/views/preview.html',
            controller: 'PreviewController',
            controllerAs: 'vmPreview'
        });
        //Nuevos servicios y repositorios
        previewController.$inject = [
            "$scope",
            "AuthService",
            "CountryService",
            "DonationService",
            "PaymentService",
            "$state",
            "DonationRepository"
        ];

        function previewController($scope, AuthService, CountryService, DonationService, PaymentService, $state, DonationRepository){
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

            vm.initStep = initStep;
            vm.prevStep = prevStep;
            vm.addDonation = addDonation;
            function prevStep(){
                $state.go("agencies");
            }

            function initStep(){
                $state.go("addDonation");
            }

            function addDonation(){
                DonationService.setDonationModel();
                var payment = DonationService.getPayment();
                DonationRepository.addDonation(payment).then(function(data){
                    vm.data = data;
                    if(vm.data.status == 200){
                        alert("Add donation success");
                        $state.go("home")
                    }
                    else{
                        alert("Error: We have a some problems adding the donations please review the data");
                    }
                }).catch(function(err){
                    console.log(err);
                    alert("Error: We have a some problems adding the donations please review the data");
                });
            }
        }
})();