(function () {
'use strict';

	angular.module('Donation')
        .controller('DonationController',donationController)
        .component('donationComponent',{
            templateUrl: '/views/addDonation.html',
            controller: 'DonationController',
            controllerAs: 'vmDonation'
        });
        //Nuevos servicios y repositorios
        donationController.$inject = [
            "$scope",
            "AuthService",
            "CountryService",
            "DonationService",
            "PaymentService",
            "$state"
        ];

        function donationController($scope, AuthService, CountryService, DonationService, PaymentService, $state){
            var vm = this;
            vm.paymentLabels = {};
            vm.amountOptions = {};
            vm.countries = [];
            vm.states = [];
            vm.year = [];
            vm.alert = null;
            vm.dpOpen = false;
            vm.dpFormat = 'MM/yy';
            vm.dpOptions = {
                datepickerMode: 'month',
                minMode: 'month'
            }
            var today = new Date();
            vm.cardExpires = new Date(today.getFullYear(), today.getMonth(), null, null, null, null, null);
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
            vm.validDate = true;

            
            

            getPaymentLabels();
            getCountries();
            getStates();
            
            
            
            vm.paymentDetails = DonationService.getPaymentConfig();
            vm.change = change;
            vm.validateCardNumber = validateCardNumber;
            vm.validatecardName = validatecardName;
            vm.validateCustomPledge = validateCustomPledge;
            vm.validateDate = validateDate;
            vm.submitForm = submitForm;

            
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

            vm.closeAlert =  closeAlert
            
            function closeAlert() {
              vm.alert = null;
            };
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
                var one = 1;
            }

            function getOrganizations(){
                DonationService.getOrganizations().then(function(data){
                    vm.orgs = data;
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

            function submitForm(){
                if(vm.donationForm.$valid){
                    var realDate = DonationService.DateFormat(vm.cardExpires);
                    vm.paymentDetails.formattedExpiryDate = realDate;
                    DonationService.setPaymentConfig(vm.paymentDetails)
                    $state.go("agencies");
                }
                else{
                    vm.alert = "Invalid form please complete all the required fields";
                }
                
            }

            function validateDate(){
                var selectYear = vm.cardExpires.getFullYear();
                var selectMonth = vm.cardExpires.getMonth();
                selectMonth = Number(selectMonth);
                selectYear = Number(selectYear);
                var today = new Date();
                if(selectYear < Number(today.getFullYear()) || selectMonth < Number(today.getMonth())){
                    vm.validDate = false;
                    vm.donationForm.cardExpires.$setValidity("cardExpires", false);
                }
                else{
                    vm.validDate = true;
                    vm.donationForm.cardExpires.$setValidity("cardExpires", true);
                }
                    
                

            }

            
        }
})();