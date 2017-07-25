(function () {
'use strict';

	angular.module('Donations')
        .controller('HomeController',homeController)
        .component('homeComponent',{
            templateUrl: '/views/home.html',
            controller: 'HomeController',
            controllerAs: 'vmHome'
        });
        //Nuevos servicios y repositorios
        homeController.$inject = [
            "$scope",
            "AuthService",
            "DonationService",
            '$uibModal',
            '$state',
            'uiGridConstants'
        ];

        function homeController($scope, AuthService, DonationService, $uibModal, $state, uiGridConstants){
            var vm = this;

            vm.donations = {};
            vm.donationTable = [{
                Date: null,
                Campaing: null,
                Pledge: null,
                PaymentType: null,
                Total: null
            }];
            getDonations();
            vm.gridOptions = {

                showGridFooter: false,
                showColumnFooter: false,
                enableFiltering: true,
                columnDefs: [
                    { name:'Campaing', field: 'Campaing' },
                    { name:'Pledge', field: 'Pledge',width: '20%' },
                    { field: 'Total', field:'Total', cellFilter:'currency', width: '13%' },
                    { name: 'Payment Type', field: 'PaymentType', width: '13%'},
                    { name: 'Date', field: 'Date', width: '20%', cellFilter: 'date'}
                ],
                data: vm.donationTable,
                onRegisterApi: function(gridApi) {
                        vm.gridApi = gridApi;
                }

            };
            function getDonations(){
                DonationService.getAllDonationsByUser().then(function(data){
                    vm.donations = data;
                    console.log(vm.donations);
                    vm.donationTable = DonationService.getTableData(vm.donations);
                    vm.gridOptions.data = vm.donationTable;
                    console.log(vm.donationTable);
                }).catch(function(err){
                    console.log(err);
                });
            }
           

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
                $state.go("addDonation");
            }
            
            

        }
})();