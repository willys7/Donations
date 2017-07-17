(function () {
'use strict';

	angular.module('Donations')
        .controller('DonationController',donationController)
        //Nuevos servicios y repositorios
        donationController.$inject = [
            "$scope",
            "AuthService",
            "DonationService",
            '$uibModal'
        ];

        function donationController($scope, AuthService, DonationService, $uibModal){
            var vm = this;

            vm.donations = {};
            
            
            DonationService.getAllDonationsByUser().then(function(data){
                vm.donations = data;
                console.log(vm.donations);
            }).catch(function(err){
                console.log(err);
            });

            vm.donationDetails = donationDetails;

            function donationDetails(donation){
                
                return $uibModal.open({
                    controller: 'DetailsController',
                    controllerAs: 'vmDetails',
                    templateUrl: 'views/details.html',
                    resolve:{
                        donationDetails: function(){
                            return donation
                        }
                    }
                });
                
            }
            
            

        }
})();