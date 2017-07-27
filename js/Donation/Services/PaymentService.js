(function () {
'use strict';
	angular.module('Donations').factory('PaymentService',paymentService);
        paymentService.$inject = ['$http','PaymentRepository'];
        function paymentService($http, PaymentRepository){
            var paymentTypeLabels = {};
            var service = {
                getPaymentTypeLabels : getPaymentTypeLabels,
                paymentTypeLabels : paymentTypeLabels
            };
            return service;

            function getPaymentTypeLabels(){
                return PaymentRepository.getPaymentTypeLabels().then(function(data){
                    service.paymentTypeLabels = data.data.Data;
                    return service.paymentTypeLabels;
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
})();