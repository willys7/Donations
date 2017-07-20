(function () {
'use strict';

	angular.module('Donations')
        .controller('AgenciesController',agenciesController)
        //Nuevos servicios y repositorios
        agenciesController.$inject = [
            "$scope",
            "AuthService",
            "CountryService",
            "DonationService",
            "PaymentService",
            "$location"
        ];

        function agenciesController($scope, AuthService, CountryService, DonationService, PaymentService, $location){
            var vm = this;
            vm.currentOrg = null;
            vm.validOrg = true;


            getOrganizations();
            vm.submitForm = submitForm;
            vm.validateOrg = validateOrg; 
            vm.prevStep = prevStep;
            function getOrganizations(){
                DonationService.getOrganizations().then(function(data){
                    vm.orgs = data;
                    console.log(vm.orgs);
                }).catch(function(err){
                    console.log(err);
                })
            }
            function validateOrg(){
                if(vm.currentOrg != null){
                    vm.validOrg = true;
                }
                else{
                    vm.validOrg = false;
                }
            }
            function submitForm(valid){
                if(valid){
                    console.log(vm.currentOrg);
                    var data = JSON.parse(vm.currentOrg);
                    DonationService.setAgencyDetails(data);
                    $location.path("/preview");
                }
                else{
                    alert("Please select one organization");
                }
            }

            function prevStep(){
                $location.path("/AddDonation");
            }
        }
})();