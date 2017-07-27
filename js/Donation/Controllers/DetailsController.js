(function () {
'use strict';

	angular.module('Donation')
        .controller('DetailsController',detailsController)
        .component('detailComponent',{
            templateUrl: '/views/details.html',
            controller: 'DetailsController',
            controllerAs: 'vmDetails'
        });
        //Nuevos servicios y repositorios
        detailsController.$inject = [
            "$scope",
            '$stateParams',
            '$state'
        ];

        function detailsController($scope, $stateParams, $state){
            var vm = this;
            vm.donation = $stateParams.donationDetails;
            vm.cancel = cancel;
            function cancel() {
                $state.go('home');
            };
            
        }

})();