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


            vm.getOrganizations = getOrganizations;
            function getOrganizations(){
                DonationService.getOrganizations().then(function(data){
                    vm.orgs = data;
                    console.log(vm.orgs);
                }).catch(function(err){
                    console.log(err);
                })
            }
        }
})();