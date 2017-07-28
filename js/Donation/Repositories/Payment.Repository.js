(function () {
'use strict';
	angular.module('Donation').factory('PaymentRepository',paymentRepository);
        paymentRepository.$inject = ['$http','AuthService'];
        function paymentRepository($http, AuthService){
            var repository = {
                getPaymentTypeLabels : getPaymentTypeLabels
            };

            return repository;

            function getPaymentTypeLabels(){
                var authModel = AuthService.getKeys();
                return $http({

                    "method": "GET", 
                    "url": "http://841893c2.ngrok.io/OPPS.Web.API/api/Configuration/PaymentTypeConfiguration",
                    "data" : {},
                    "params" : {
                        'donorToken': authModel.userKey,
                        'paymentType' : 2,
                        'apiKey' : "QBnS2atww0KBvmJ6No4oyW2Y2D5+UuS6CKaV0ByJAAs="
                    },
                    "headers": {
                        'Authorization': "Bearer " +  authModel.apiKey
                    }
                }).then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });
            }

        }
})();
