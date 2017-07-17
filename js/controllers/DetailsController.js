(function () {
'use strict';

	angular.module('Donations')
        .controller('DetailsController',detailsController)
        //Nuevos servicios y repositorios
        detailsController.$inject = [
            "$scope",
            "donationDetails"
        ];

        function detailsController($scope, donationDetails){
            console.log(donationDetails);
        }

})();