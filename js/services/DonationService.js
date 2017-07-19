(function () {
'use strict';
	angular.module('Donations').factory('DonationService',donationService);
        donationService.$inject = ['$http','DonationRepository'];
        function donationService($http, DonationRepository){
            var donations = {};
            var orgs = {};
            var paymentConfig = {
                Id : null,
                cardName : null,
                cardNumber : null,
                formattedExpiryDate : null,
                contactEmail : null,
                cardVrfy : null,
                pledgeAmount : null,
                month : null,
                year : null
            };
            var agencyDetails = {
                DesignationEntityType : "",
                Name : "",
                EIN : "",
                EntityId : 0,
                MinimumDonation : 0,
                MinimumTotalDonationForDesignation : 0,
                ProfileOrganizationNumber : 0,
                StandardAccountCode : ""
            };
            var postDonation = {
                CAddOnList: [], //None
                AddonTotalList: [], //None
                AddOnTotalValue: 0, //No value
                CampaignId: "c4f85b7e-54eb-4194-bcb1-b0a072217e09",
                CustomField1: paymentConfig.Id,
                CustomField2: paymentConfig.cardName,
                CustomField3: paymentConfig.cardNumber,
                CustomField4: paymentConfig.formattedExpiryDate,
                CustomField5: paymentConfig.contactEmail,
                CustomField6: paymentConfig.cardVrfy,
                DesignationAmountType: 1,
                DesignationList: [{
                    DesignateableEntityType: agencyDetails.DesignationEntityType,
                    DesignationAmount: paymentConfig.pledgeAmount,
                    DisplayName: agencyDetails.Name,
                    EIN: agencyDetails.EIN,
                    EntityId: agencyDetails.EntityId,
                    IsDefaultPanelItem: false,
                    IsRejected: false,
                    MinimumDonation: agencyDetails.MinimumDonation,
                    MinimumTotalDonationForDesignation: agencyDetails.MinimumTotalDonationForDesignation,
                    Name: agencyDetails.Name,
                    OrganizationNumber: agencyDetails.ProfileOrganizationNumber,
                    StandardAccountCode: agencyDetails.StandardAccountCode
                }],
                DesignationWriteInList: [], //None
                DonationSourceType: 9,
                FrequencyType: 1, //paymentConfig.donationFrequency; send 1 because payment type is cash,
                ImpersonatedUser: "",
                IsConfirmed: true,
                IsImpersonated: false,
                NegativeDesignation: "", //None
                Payment: { /*Empty because cash doesn't accept billing data*/ },
                PaymentAmount: paymentConfig.pledgeAmount,
                PaymentAmountType: 1,
                PaymentIncreaseAmount: 0,
                PaymentIncreaseAmountType: 1,
                PaymentTotalValue: paymentConfig.pledgeAmount,
                PaymentType: 5,
                PledgeStatusType: 0,
                TotalValue: paymentConfig.pledgeAmount,
            };
            var service = {
                getAllDonationsByUser :  getAllDonationsByUser,
                getOrganizations : getOrganizations,
                donations : donations,
                orgs : orgs,
                paymentConfig : paymentConfig,
                agencyDetails : agencyDetails,
                postDonation : postDonation,
                getPaymentConfig : getPaymentConfig,
                setPaymentConfig : setPaymentConfig
            };
            
            return service

            function getAllDonationsByUser(){
                return DonationRepository.getAllDonationsByUser().then(function(data){
                    service.donations = data.data.Data.PledgeList;
                    return service.donations;
                }).catch(function(err){
                    console.log(err);
                });

                
            }

            function getOrganizations(){
                return DonationRepository.getOrganizations().then(function(data){
                    service.orgs = data.data.Data;
                    return service.orgs;
                }).catch(function(err){
                    console.log(err);
                });
            }

            function getPaymentConfig(){
                return service.paymentConfig;
            }

            function setPaymentConfig(payment){
                service.paymentConfig.Id = payment.Id;
                service.paymentConfig.cardName = payment.cardName;
                service.paymentConfig.cardNumber = payment.cardNumber;
                service.paymentConfig.formattedExpiryDate = payment.formattedExpiryDate;
                service.paymentConfig.contactEmail = payment.contactEmail;
                service.paymentConfig.cardVrfy = payment.cardVrfy;
                service.paymentConfig.pledgeAmount = payment.pledgeAmount;
            }

            
        }
})();