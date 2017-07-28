(function () {
'use strict';
	angular.module('Donation').factory('DonationService',donationService);
        donationService.$inject = ['$http','DonationRepository'];
        function donationService($http, DonationRepository){
            var donations = {};
            var orgs = {};
            var tableData = [];
            var paymentConfig = {
                Id : null,
                cardName : null,
                cardNumber : null,
                formattedExpiryDate : null,
                contactEmail : null,
                cardVrfy : null,
                pledgeAmount : null,
                customPledgeAmount : null,
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
                setPaymentConfig : setPaymentConfig,
                getAgencyDetails : getAgencyDetails,
                setAgencyDetails : setAgencyDetails,
                setDonationModel : setDonationModel,
                getPayment : getPayment,
                tableData : tableData,
                getTableData : getTableData,
                DateFormat : DateFormat
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

            function getTableData(data){
                for(var i=0; i<data.length; i++){
                    var element = data[i]
                    var donation = {
                        Date: element.DateCreated,
                        Campaing: element.CampaignName,
                        Pledge: element.TransactionNumber,
                        PaymentType: 'Cash',
                        Total: element.PaymentAmount,
                        Campaign: element.CampaignName
                    };
                    service.tableData.push(donation);
                }
                return service.tableData;
            }

            function getPaymentConfig(){
                return service.paymentConfig;
            }

            function setPaymentConfig(payment){
                
                if(payment.Id == "Visa"){
                    service.paymentConfig.Id = 1;
                }
                if(payment.Id == "Master Card"){
                    service.paymentConfig.Id = 2;
                }
                if(payment.Id == "American Express"){
                    service.paymentConfig.Id = 3;
                }
                if(payment.Id == "Discover"){
                    service.paymentConfig.Id = 4;
                }
                if(payment.Id == "Diners Club"){
                    service.paymentConfig.Id = 5;
                }
                if( payment.pledgeAmount == -7.922816251426434e+28){
                    service.paymentConfig.pledgeAmount = payment.customPledgeAmount;
                }
                else{
                    service.paymentConfig.pledgeAmount = payment.pledgeAmount;
                }
                service.paymentConfig.cardName = payment.cardName;
                service.paymentConfig.cardNumber = payment.cardNumber;
                service.paymentConfig.formattedExpiryDate = payment.formattedExpiryDate;
                service.paymentConfig.contactEmail = payment.contactEmail;
                service.paymentConfig.cardVrfy = payment.cardVrfy;
                service.paymentConfig.customPledgeAmount = payment.customPledgeAmount
            }

            function setAgencyDetails(agency){
                service.agencyDetails.DesignationEntityType = agency.DesignationEntityType;
                service.agencyDetails.Name = agency.Name;
                service.agencyDetails.EIN = agency.EIN;
                service.agencyDetails.EntityId = agency.EntityId;
                service.agencyDetails.MinimumDonation = agency.MinimumDonation;
                service.agencyDetails.MinimumTotalDonationForDesignation = agency.MinimumTotalDonationForDesignation;
                service.agencyDetails.ProfileOrganizationNumber = agency.ProfileOrganizationNumber;
                service.agencyDetails.StandardAccountCode = agency.StandardAccountCode;
            }

            function getAgencyDetails(){
                return service.agencyDetails;
            }

            function setDonationModel(){
                service.postDonation = {
                    CAddOnList: [], //None
                    AddonTotalList: [], //None
                    AddOnTotalValue: 0, //No value
                    CampaignId: "c4f85b7e-54eb-4194-bcb1-b0a072217e09",
                    CustomField1: service.paymentConfig.Id,
                    CustomField2: service.paymentConfig.cardName,
                    CustomField3: service.paymentConfig.cardNumber,
                    CustomField4: service.paymentConfig.formattedExpiryDate,
                    CustomField5: service.paymentConfig.contactEmail,
                    CustomField6: service.paymentConfig.cardVrfy,
                    DesignationAmountType: 1,
                    DesignationList: [{
                        DesignateableEntityType: service.agencyDetails.DesignationEntityType,
                        DesignationAmount: service.paymentConfig.pledgeAmount,
                        DisplayName: service.agencyDetails.Name,
                        EIN: service.agencyDetails.EIN,
                        EntityId: service.agencyDetails.EntityId,
                        IsDefaultPanelItem: false,
                        IsRejected: false,
                        MinimumDonation: service.agencyDetails.MinimumDonation,
                        MinimumTotalDonationForDesignation: service.agencyDetails.MinimumTotalDonationForDesignation,
                        Name: service.agencyDetails.Name,
                        OrganizationNumber: service.agencyDetails.ProfileOrganizationNumber,
                        StandardAccountCode: service.agencyDetails.StandardAccountCode
                    }],
                    DesignationWriteInList: [], //None
                    DonationSourceType: 9,
                    FrequencyType: 1, //paymentConfig.donationFrequency; send 1 because payment type is cash,
                    ImpersonatedUser: "",
                    IsConfirmed: true,
                    IsImpersonated: false,
                    NegativeDesignation: "", //None
                    Payment: { /*Empty because cash doesn't accept billing data*/ },
                    PaymentAmount: service.paymentConfig.pledgeAmount,
                    PaymentAmountType: 1,
                    PaymentIncreaseAmount: 0,
                    PaymentIncreaseAmountType: 1,
                    PaymentTotalValue: service.paymentConfig.pledgeAmount,
                    PaymentType: 5,
                    PledgeStatusType: 0,
                    TotalValue: service.paymentConfig.pledgeAmount,
                };
            }

            function getPayment(){
                
                return service.postDonation;
            }

            function DateFormat(date){
                var year = date.getFullYear();
                year = year.toString();
                year = year.substr(2,4);

                var month = date.getMonth();
                month = month.toString();
                var newDate = year + month;
                return newDate;
            }

            
        }
})();