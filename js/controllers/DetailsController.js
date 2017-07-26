(function () {
'use strict';

	angular.module('Donations')
        .controller('DetailsController',detailsController)
        .component('detailComponent',{
            templateUrl: '/views/details.html',
            controller: 'DetailsController',
            controllerAs: 'vmDetails'
        });
        //Nuevos servicios y repositorios
        detailsController.$inject = [
            "$scope",
            "donationDetails",
            "$uibModalInstance"
        ];

        function detailsController($scope, donationDetails, $uibModalInstance){
            var vm = this;
            vm.donation = donationDetails;
            vm.cancel = cancel;
            function cancel() {
                $uibModalInstance.dismiss('cancel');
            };
            
        }

})();