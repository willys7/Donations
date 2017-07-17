(function () {
'use strict';

	angular.module('Donations')
        .controller('HomeController',homeController)
        //Nuevos servicios y repositorios
        homeController.$inject = [
            "$scope",
            "AuthService",
            "DonationService",
            '$uibModal',
            '$location'
        ];

        function homeController($scope, AuthService, DonationService, $uibModal, $location){
            var vm = this;

            vm.donations = {};
            
            
            DonationService.getAllDonationsByUser().then(function(data){
                vm.donations = data;
                console.log(vm.donations);
            }).catch(function(err){
                console.log(err);
            });

            vm.donationDetails = donationDetails;
            vm.addDonation = addDonation;
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

            function addDonation(){
                $location.path("/AddDonation");
            }
            
            

        }
})();