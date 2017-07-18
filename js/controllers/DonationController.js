(function () {
'use strict';

	angular.module('Donations')
        .controller('DonationController',donationController)
        //Nuevos servicios y repositorios
        donationController.$inject = [
            "$scope",
            "AuthService",
            "CountryService",
            "DonationService",
            "PaymentService"
        ];

        function donationController($scope, AuthService, CountryService, DonationService, PaymentService){
            var vm = this;
            vm.paymentLabels = {}
            vm.amountOptions = {}
            vm.year = [];
            for (var i=2017; i<=2025; i++){
                vm.year.push(i);
            }
            vm.month = [];
            for (var i=1; i<=12; i++){
                vm.month.push(i);
            }
            

            getPaymentLabels();
            getCountries();
            getStates();
            function getPaymentLabels(){
                PaymentService.getPaymentTypeLabels().then(function(data){
                    vm.paymentLabels = data;
                    vm.amountOptions = data.AmountQuestions[0].AmountOptions;
                    var creditCardList = data.CreditCardTypeList;
                    vm.creditCardValues = [];
                    for(var i=0; i<creditCardList.length; i++){
                        if(creditCardList[i] == 1){
                            vm.creditCardValues.push("Visa")
                        }
                        if(creditCardList[i] == 2){
                            vm.creditCardValues.push("Master Card")
                        }
                        if(creditCardList[i] == 3){
                            vm.creditCardValues.push("American Express")
                        }
                        if(creditCardList[i] == 4){
                            vm.creditCardValues.push("Discover")
                        }
                        if(creditCardList[i] == 5){
                            vm.creditCardValues.push("Diners Club")
                        }
                    }
                }).catch(function(err){
                    console.log(err);
                });
            }

            function getCountries(){
                CountryService.getCountries().then(function(data){
                    console.log(data);
                }).catch(function(err){
                    console.log(err);
                });
            }

            function getStates(){
                CountryService.getUSStates().then(function(data){
                    console.log(data);
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
})();