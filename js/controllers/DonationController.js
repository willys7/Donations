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
            "PaymentService",
            "$location"
        ];

        function donationController($scope, AuthService, CountryService, DonationService, PaymentService, $location){
            var vm = this;
            vm.paymentLabels = {};
            vm.amountOptions = {};
            vm.countries = [];
            vm.states = [];
            vm.year = [];
            vm.orgs = {};
            vm.validNumber = true;
            vm.validName = true;
            vm.validCustomPledge = true;
            vm.contact ={
                country : null,
                address : null,
                address2 : null,
                city : null,
                state : null,
                zipCode : null,
                zipExtension : null,
                province : null,
                postalCode : null
            };

            for (var i=17; i<=25; i++){
                vm.year.push(i);
            }
            vm.month = [];
            for (var i=1; i<=12; i++){
                vm.month.push(i);
            }
            

            getPaymentLabels();
            getCountries();
            getStates();
            getOrganizations();
            vm.paymentDetails = DonationService.getPaymentConfig();
            vm.change = change;
            vm.validateCardNumber = validateCardNumber;
            vm.validatecardName = validatecardName;
            vm.validateCustomPledge = validateCustomPledge;
            vm.submitForm = submitForm;
            function getPaymentLabels(){
                PaymentService.getPaymentTypeLabels().then(function(data){
                    vm.paymentLabels = data;
                    vm.amountOptions = data.AmountQuestions[0].AmountOptions;
                    console.log(vm.amountOptions)
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
                    vm.countries = data;
                }).catch(function(err){
                    console.log(err);
                });
            }

            function getStates(){
                CountryService.getUSStates().then(function(data){
                    vm.states = data;
                }).catch(function(err){
                    console.log(err);
                });
            }
            function change(){
                console.log(vm.paymentDetails);
            }

            function getOrganizations(){
                DonationService.getOrganizations().then(function(data){
                    vm.orgs = data;
                    console.log(vm.orgs);
                }).catch(function(err){
                    console.log(err);
                })
            }
            function validateCardNumber(){
                if (vm.paymentDetails.Id == "Visa"){
                    vm.validNumber = /^4[0-9]{12}(?:[0-9]{3})?$/.test(vm.paymentDetails.cardNumber);
                }
                if(vm.paymentDetails.Id == "Master Card"){
                    vm.validNumber = /^5[1-5][0-9]{14}$/.test(vm.paymentDetails.cardNumber);
                }
                if(vm.paymentDetails.Id == "American Express"){
                    vm.validNumber = /^3[47][0-9]{13}$/.test(vm.paymentDetails.cardNumber);
                }
                if(vm.paymentDetails.Id == "Discover"){
                    vm.validNumber = /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(vm.paymentDetails.cardNumber);
                }
                if(vm.paymentDetails.Id == "Diners Club"){
                    vm.validNumber = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(vm.paymentDetails.cardNumber);
                }
                if(vm.paymentDetails.cardNumber == null || vm.paymentDetails.cardNumber == "" || vm.paymentDetails.cardNumber == 0){
                    vm.validNumber = true
                }
            }

            function validatecardName(){
                if(vm.paymentDetails.cardName == null){
                    vm.validName = true;
                }
                else{
                    if(!vm.paymentDetails.cardName.includes(" ")){
                        vm.validName = false;
                    }else{
                        vm.validName = true;
                    }
                    if(vm.paymentDetails.cardName == null || vm.paymentDetails.cardName == ""){
                        vm.validName = true;
                    }
                }
            }

            function validateCustomPledge(){
                if(vm.paymentDetails.pledgeAmount == -7.922816251426434e+28){
                    var minValue = vm.amountOptions[0].Amount;
                    var value = Number(vm.paymentDetails.customPledgeAmount);
                    if(isNaN(value)){
                        vm.validCustomPledge = false;
                    }
                    if( value < 0 || value < minValue){
                        vm.validCustomPledge = false;
                    }
                    else{
                        vm.validCustomPledge = true;
                    }
                }
                else{
                    vm.validCustomPledge = true;
                }
               
            }

            function submitForm(valid){
                console.log(valid);
                DonationService.setPaymentConfig(vm.paymentDetails)
                $location.path("/agencies");
            }

            
        }
})();